import BackToHub from "@/components/BackToHub";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Countdown from "react-countdown";
import { useBalances } from "@/hooks/useBalances";
import { formatBalance } from "@/util/formatBalance";

function MeetingPage() {
  const { message, tokenBalances, nativeBalance } = useBalances();
  const [tokenExists, setTokenExists] = useState(false)
  const [isEligible, setEligible] = useState(false)

  const native =
    nativeBalance && Number(nativeBalance.balance) > 0
      ? formatBalance(nativeBalance.balance)
      : 0;
  //const isEligible = Number(native) > 0;
  const countdownDate = new Date("2023-12-31T23:59:59");
  //Token to search
  const my_token_symbol = "INTER"

  

  if (message) return <p>{message}</p>;

  //find the token if exist
  const findToken = () => {
    const fan_token = tokenBalances.find(token => token.symbol === my_token_symbol)
    if (!fan_token) {
      setTokenExists(false)
      return
    }
        
    setEligible(Number(native) > 0 && +formatBalance(fan_token.balance, fan_token.decimals) > 1)
    setTokenExists(+fan_token.balance > 0) 
  }

  useEffect(() => {
    findToken()
  }, [findToken])
  
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div>
          <h1 className="my-8 text-center text-3xl font-bold  ">
            MEETING WILL START SOON!
          </h1>
          <Countdown date={countdownDate} className={styles.countdown} />
            {tokenExists && <strong>Token with the symbol of {my_token_symbol} has been found!</strong>}
          <h2 className="my-8 text-center text-xl font-bold">
            <div className="my-4">
              only native token holders will be eligible to join
            </div>
            <div className="my-4">{`Your native balance is ${native}`}</div>
            <div className="my-4 ">
              {`YOU ARE ${isEligible ? "" : "NOT"} ELIGIBLE`}
            </div>
          </h2>

          <BackToHub />
        </div>
      </div>
    </main>
  );
}

export default MeetingPage;
