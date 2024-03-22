import styles from  './ProgressBar.module.css';

function CircProgBar ({scoreVal,textVal}) {

    const progRad = 72;
    const progCirc = 452.389;

    const handleProg =() => {
        return ((100 - scoreVal)/100) * progCirc
    }

    return (
    <div className={styles.main}>
        <svg width={160} height={160}>
            <circle cx={80} cy={80} r={72} stroke="#DDE0E5" strokeWidth={12} fill="none"/>
            <circle className={styles.progBar}
            cx={80} cy={80}
            r={progRad}
            stroke="#279af1"
            strokeDasharray={progCirc}
            strokeDashoffset={handleProg()} 
            strokeWidth={12}
            fill="none"/>
        </svg>
        <section className={styles.textcont}>
            <span className={styles.score}>{`${scoreVal.toFixed(1)}%`}</span>
        </section>
        <span className='pt-3'>{textVal}</span>
    </div>
    )
}

export default CircProgBar;