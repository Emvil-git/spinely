import styles from  './ProgressBar.module.css';

function CircProgBar () {

    const scoreVal = 90;

    const progRad = 72;
    const progCirc = 452.389;

    const handleProg =() => {
        return ((100 - scoreVal)/100) * progCirc
    }

    return (
    <div className={styles.main}>
        <svg width={160} height={160}>
            <circle cx={80} cy={80} r={72} stroke="#f3f3f324" strokeWidth={8} fill="none"/>
            <circle className={styles.progBar}
            cx={80} cy={80}
            r={progRad}
            stroke="#279af1"
            strokeDasharray={progCirc}
            strokeDashoffset={handleProg()} 
            strokeWidth={10}
            fill="none"/>
        </svg>
        <section className={styles.textcont}>
            <label className={styles.label}>Test</label>
            <span className={styles.score}>{scoreVal}</span>
        </section>
    </div>
    )
}

export default CircProgBar;