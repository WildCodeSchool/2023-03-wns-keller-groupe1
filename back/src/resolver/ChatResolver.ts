import { PubSubEngine } from "graphql-subscriptions";
import { Arg, Mutation, PubSub, Publisher, Query, Resolver, ResolverFilterData, Root, Subscription } from "type-graphql";
import { NotificationPayload, Notification, SubscribedUsers } from "../type/notification.type";

@Resolver()
export class ChatResolver {

  private subscribedUsers: Array<SubscribedUsers> = [];

  // private sendNotificationToSubscribers(pubSub: PubSubEngine, topic: string, payload: NotificationPayload) {
  //   this.subscribedUsers.forEach((user) => {
  //     if (user.topic == topic) {
  //       pubSub.publish(user.topic, payload);
  //     } 
  //   });
  // }
  
  @Query(() => [SubscribedUsers])
  async getSubscribedUsers(
    @Arg("topic") topic: string
  ): Promise<any> {
    let usersArray: Array<SubscribedUsers> = [];
    this.subscribedUsers.forEach((user) => {
      if (user.topic === topic) {
        usersArray.push(user);
      }
    });
    return usersArray;
  }

  @Mutation(returns => Boolean)
  async subscribeToDynamicTopic(
    @PubSub() pubSub: PubSubEngine,
    @Arg("username") username: string,
    @Arg("topic") topic: string
  ): Promise<boolean> {
    this.subscribedUsers.push({topic, username});
    return true;
  }

   @Mutation(returns => Boolean)
   async unsubscribeFromDynamicTopic(
     @Arg("username") username: string,
     @Arg("topic") topic: string
   ): Promise<any> {
    const index = this.subscribedUsers.findIndex(user => user.username === username && user.topic === topic);
    if (index > -1) {
      this.subscribedUsers.splice(index, 1);
    }
    return true;
   }

  @Mutation(returns => Boolean)
  async pubSubMutation(
    @PubSub() pubSub: PubSubEngine,
    @Arg("id") id: number,
    @Arg("message", { nullable: true }) message?: string,
    @Arg("username", { nullable: true }) username?: string
  ): Promise<boolean> {
    const payload: NotificationPayload = { id, message, username };
    await pubSub.publish("NOTIFICATIONS", payload);
    return true;
  }

  @Mutation(returns => Boolean)
  async publisherMutation(
    @PubSub("NOTIFICATIONS") publish: Publisher<NotificationPayload>,
    @Arg("id") id: number,
    @Arg("message", { nullable: true }) message?: string,
    @Arg("username", { nullable: true }) username?: string
  ): Promise<boolean> {
    await publish({ id, message, username });
    return true;
  }

  @Subscription({ topics: "NOTIFICATIONS" })
  normalSubscription(@Root() { id, message }: NotificationPayload): Notification {
    return { id, message, date: new Date() };
  }

  // @Subscription(returns => Notification, {
  //   topics: "NOTIFICATIONS",
  //   filter: ({ payload }: ResolverFilterData<NotificationPayload>) => payload.id % 2 === 0,
  // })
  // subscriptionWithFilter(@Root() { id, message }: NotificationPayload) {
  //   const newNotification: Notification = { id, message, date: new Date() };
  //   return newNotification;
  // }

  // dynamic topic

  @Mutation(returns => Boolean)
  async pubSubMutationToDynamicTopic(
    @PubSub() pubSub: PubSubEngine,
    @Arg("topic") topic: string,
    @Arg("id") id: number,
    @Arg("message", { nullable: true }) message?: string,
    @Arg("username", { nullable: true }) username?: string
  ): Promise<boolean> {
    const payload: NotificationPayload = { id, message, username };
    await pubSub.publish(topic, payload);
    return true;
  }

  // @Subscription({
  //   topics: ({ args }) => args.topic,
  // })
  // subscriptionWithFilterToDynamicTopic(
  //   @Arg("topic") topic: string,
  //   @Root() { id, message, username }: NotificationPayload,
  // ): Notification {
  //   return { id, message, username, date: new Date() };
  // }

  // Updated subscription method with the addition of sending notifications to subscribers

  @Subscription({
    topics: ({ args }) => args.topic,
  })
  subscriptionWithFilterToDynamicTopic(
    @Arg("topic") topic: string,
    @Root() { id, message, username }: NotificationPayload,
    @PubSub() pubSub: PubSubEngine
  ): Notification {
    const notification: Notification = { id, message, username, date: new Date() };
    return notification;
  }
}