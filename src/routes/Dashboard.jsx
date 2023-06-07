import styles from './Dashboard.module.css'

export default function Dashboard() {
    return (
        <div className={`${styles.main} bg-secondary page`}>
            <section className={`${styles.left}`}>
                <h2 className={`${styles.top}`}>hello</h2>
                <section className={`${styles.leftcont}`}>
                    <div className={`${styles.cont} bg-light rounded`}>
                    report
                    </div>
                    <section className={`${styles.datasect}`}>
                        <div className={`${styles.cont} bg-light rounded`}>
                            data1
                        </div>
                        <div className={`${styles.cont} bg-light rounded`}>
                            data2
                        </div>
                    </section>
                </section>
            </section>
            <section className={`${styles.right}`}>
                <div className={`${styles.cont} ${styles.top} bg-light rounded`}>profile</div>
                <section className={`${styles.leftcont}`}>
                    <div className={`${styles.cont} bg-light rounded`}>calendar</div>
                    <div className={`${styles.cont} ${styles.imgdiv} bg-light rounded`}>image</div>
                </section>
            </section>
        </div>
    )
}