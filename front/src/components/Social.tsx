import Navbar from '../navigation/Navbar'
import styles  from "../styles/social.module.css";
import { ReactComponent as CrossIcon } from "../assets/icons/cross.svg";
import { ReactComponent as VectorIcon } from "../assets/icons/Vector.svg";
// import { useGetUserFriendList } from '../hooks/get-user-friend-list';
import { useQuery } from '@apollo/client';
import { GET_USER_FRIEND_LIST } from '../hooks/get-user-friend-list';





const Social = () => {
// const {data, error } = useGetUserFriendList()
const {data, error } = useQuery()


console.log(data);


  return (
    <div className={styles.container}>
      <section className={styles.all_sections}>
        <Navbar />
        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.communauty_header}>
              <h2>Communautés</h2>
              <input className={styles.input_community} placeholder='Ajoutez un ami' type="text" />
            </div>
            <div className={styles.friends_request}>
              <h3>Demande d'amis :</h3>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <h2>tony</h2>
                  <h2>tony</h2>
                  <div className={styles.answer_friend}>
                    <span className={styles.icons}>
                      <CrossIcon/>
                    </span>
                    <span className={styles.icons}>
                      <VectorIcon/>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.friends_list}>
              <h2>
                Votre liste d'amis :
              </h2>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <h2>name</h2>
                  <h2>firstname</h2>
                  <div className={styles.friend_stats}>
                    <p>440 kg Co2</p>
                  </div>
                </div>
                <div className={styles.card}>
                  <h2>name</h2>
                  <h2>firstname</h2>
                  <div className={styles.friend_stats}>
                    <p>440 kg Co2</p>
                  </div>
                </div>
                <div className={styles.card}>
                  <h2>name</h2>
                  <h2>firstname</h2>
                  <div className={styles.friend_stats}>
                    <p>440 kg Co2</p>
                  </div>
                </div>
                <div className={styles.card}>
                  <h2>name</h2>
                  <h2>firstname</h2>
                  <div className={styles.friend_stats}>
                    <p>440 kg Co2</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.section_2_head}>
              <h2>Groupe</h2>
              <button className={styles.create_group}>Créer un groupe</button>
            </div>
            <div className={styles.friends_groups}>
              <h2 className={styles.groups_infos}>
                BIENTOT DISPONIBLE
              </h2>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

export default Social
