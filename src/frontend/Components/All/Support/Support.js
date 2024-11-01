import { useState } from 'react';
import styles from './styles.module.css'

function Support() {
    const questions = [
        "How can I use the app?",
        "Shop cart and purchase?",
        "Become a seller!",
        "Scam alert!",
        "Policies"
    ]
    const responses = [
        "Oh, using the app? Easy-peasy! You are already in the web, so. Make an account or log in if you already did that, and boom—you can scroll around, add stuff to your cart, and buy it like a pro!",
        "So, adding to the cart... find something shiny, hit the 'Add to Cart' button, and it's yours—well, not yet. Check your cart by clicking the cart icon, and when you're really, really sure, just checkout and wait for the magic delivery.",
        "Wanna be a seller? Cool move! Head over to 'Become a Seller,' make a seller account, and start listing all your goodies. We give you all the tools to be a boss, track orders, and wow your new fans.",
        "Scam alert, scam alert! Make sure you're only buying stuff through our app, don't share any secret stuff, and keep an eye on the reviews. If anything seems sketchy, let us know, and we'll deal with it!",
        "Policies! Yeah, they're important. Head to the 'Policies' section to read up on returns, refunds, privacy, and other stuff. It's kinda like homework, but it'll help you know your rights. Better safe than sorry!"
    ];
    const [answer, setAnswer] = useState([])

    function handleClick(index) {
        console.log(index);
        setAnswer(prev => {
            console.log(prev);
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }
            else {
                return [...prev, index];
            }
        });
    }

    return (
        <>
            <div className={styles.header}>
                <p className={styles.headerText}>Support Center</p>
            </div>
            <div className={styles.banner}>
                <h1 className={styles.bannerText}>Good morning, what's your problem?</h1>
            </div>
            <ul className={styles.questionList}>
                <h2 className={styles.listTitle}>Common questions</h2>
                {
                    questions.map((question, index) => {
                        return <li key={index} className={styles.question} onClick={() => handleClick(index)}>
                            <p className={styles.questionText}>{question}</p>
                            {answer.includes(index) && <p className={styles.questionText}>{responses[index]}</p>}
                        </li>
                    })
                }
            </ul>
            <div className={styles.footer}>Need more help?</div>
            <div className={styles.contact}><i className="fa fa-phone"></i> Contact us: skibiditoilet@sigma.rizz</div>
        </>
    );
}

export default Support