import { PubSubEngine } from "graphql-subscriptions";
import { Arg, Mutation, PubSub, Publisher, Query, Resolver, ResolverFilterData, Root, Subscription } from "type-graphql";
import { NotificationPayload, Notification } from "../type/notification.type";

@Resolver()
export class TestResolver {
  private autoIncrement = 0;

  @Mutation(returns => Boolean)
  async pubSubMutation(
    @PubSub() pubSub: PubSubEngine,
    @Arg("message") message: string,
  ): Promise<boolean> {
    // const payload: NotificationPayload = { id: ++this.autoIncrement, message };
    await pubSub.publish("NOTIFICATIONS", message);
    return true;
  }

  // @Mutation(returns => Boolean)
  // async publisherMutation(
  //   @PubSub("NOTIFICATIONS") publish: Publisher<NotificationPayload>,
  //   @Arg("message", { nullable: true }) message?: string,
  // ): Promise<boolean> {
  //   await publish({ id: ++this.autoIncrement, message });
  //   return true;
  // }

  @Subscription({ topics: "NOTIFICATIONS" })
  normalSubscription(@Root() message: string): string {
    return message;
  }

  // @Subscription(returns => Notification, {
  //   topics: "NOTIFICATIONS",
  //   filter: ({ payload }: ResolverFilterData<NotificationPayload>) => payload.id % 2 === 0,
  // })
  // subscriptionWithFilter(@Root() { id, message }: NotificationPayload) {
  //   const newNotification: Notification = { id, message, date: new Date() };
  //   return newNotification;
  // }

  // // dynamic topic

  // @Mutation(returns => Boolean)
  // async pubSubMutationToDynamicTopic(
  //   @PubSub() pubSub: PubSubEngine,
  //   @Arg("topic") topic: string,
  //   @Arg("message", { nullable: true }) message?: string,
  // ): Promise<boolean> {
  //   const payload: NotificationPayload = { id: ++this.autoIncrement, message };
  //   await pubSub.publish(topic, payload);
  //   return true;
  // }

  // @Subscription({
  //   topics: ({ args }) => args.topic,
  // })
  // subscriptionWithFilterToDynamicTopic(
  //   @Arg("topic") topic: string,
  //   @Root() { id, message }: NotificationPayload,
  // ): Notification {
  //   return { id, message, date: new Date() };
  // }
}