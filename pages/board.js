import Head from 'next/head'
import styles from '../styles/Board.module.css'
import React from 'react'

export default function Home() {
  const [goal, setGoal] = React.useState("");
  const [habit, setHabit] = React. useState("");
  const [modal, setModal] = React.useState(false);
  const [modalConfirmation, setModalConfirmation] = React.useState(false);
  const [modalAlert, setModalAlert] = React.useState(false);
  const [modalReset, setModalReset] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(0);
  const [disabled, setDisabled] =  React.useState(false);
  const [position, setPosition] =  React.useState(0);
  const [tokens, setTokens] = React.useState(0);
  const [startDay, setStartDay] = React.useState(0);
  const [initialTime, setInitialTime] = React.useState(0);
  const [accomplished,setAccomplished] = React.useState(new Array(100));
  const [connect,setConnect] = React.useState("Connect Wallet");
  const [dayChecked, setDayChecked] = React.useState(false);

  React.useEffect(() => {
    if(JSON.parse(localStorage.getItem("goal") !== null)) {
      setGoal(JSON.parse(localStorage.getItem("goal")));
    }
    if(JSON.parse(localStorage.getItem("habit") !== null)) {
      setHabit(JSON.parse(localStorage.getItem("habit")));
    }
    if(JSON.parse(localStorage.getItem("disabled") !== null)) {
      setDisabled(JSON.parse(localStorage.getItem("disabled")));
    }
    if(JSON.parse(localStorage.getItem("position") !== null)) {
      setPosition(JSON.parse(localStorage.getItem("position")));
    }
    if(JSON.parse(localStorage.getItem("tokens") !== null)) {
      setTokens(JSON.parse(localStorage.getItem("tokens")));
    }
    if(JSON.parse(localStorage.getItem("startDay") !== null)) {
      setStartDay(JSON.parse(localStorage.getItem("startDay")));
    }
    if(JSON.parse(localStorage.getItem("initialTime") !== null)) {
      setInitialTime(JSON.parse(localStorage.getItem("initialTime")));
    }
    if(JSON.parse(localStorage.getItem("accomplished") !== null)) {
      setAccomplished(JSON.parse(localStorage.getItem("accomplished")));
    }
    if(JSON.parse(localStorage.getItem("dayChecked") !== null)) {
      setDayChecked(JSON.parse(localStorage.getItem("dayChecked")));
    }
  },[]);

  React.useEffect(() => {
      if(goal !== "") {
        localStorage.setItem("goal",JSON.stringify(goal))
      }
  },[goal]) 

  React.useEffect(() => {
    if(habit !== "") {
      localStorage.setItem("habit",JSON.stringify(habit))
    }
  },[habit])

  React.useEffect(() => {
    if(disabled !== false) {
      localStorage.setItem("disabled",JSON.stringify(disabled))
    }
  },[disabled])

  React.useEffect(() => {
    if(position !== 0) {
      localStorage.setItem("position",JSON.stringify(position))
    }
  },[position])

  React.useEffect(() => {
    if(tokens !== 0) {
      localStorage.setItem("tokens",JSON.stringify(tokens))
    }
  },[tokens])

  React.useEffect(() => {
    if(startDay !== 0) {
      localStorage.setItem("startDay",JSON.stringify(startDay))
    }
  },[startDay])

  React.useEffect(() => {
    if(accomplished[0] !== undefined) {
      localStorage.setItem("accomplished",JSON.stringify(accomplished))
    }
  },[accomplished])

  React.useEffect(() => {
    if(initialTime !== 0) {
      localStorage.setItem("initialTime",JSON.stringify(initialTime))
    }
  },[initialTime])

  React.useEffect(() => {
    if(dayChecked !== false) {
      localStorage.setItem("dayChecked",JSON.stringify(dayChecked))
    }
  }, [dayChecked])

  React.useEffect(() => {
      if(startDay !== 0) {
          let now = new Date();
          let start = new Date(now.getFullYear(), 0, 0);
          let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
          let oneDay = 1000 * 60 * 60 * 24;
          let day = Math.floor(diff / oneDay);
          let daySetAsInitial = parseInt(initialTime)

          function days_of_a_year(year) 
              {
              return isLeapYear(year) ? 366 : 365;
              }

              function isLeapYear(year) {
                  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
              }

          if(day >= daySetAsInitial) {
      
              if(day === daySetAsInitial) {
                  setPosition(prevPosition => prevPosition + (day-daySetAsInitial))
              } else {
                  setDayChecked(false)
                  setPosition(prevPosition => prevPosition + (day-daySetAsInitial-1))
              }
              
          } else {
              setPosition(prevPosition => prevPosition + (days_of_a_year(now.getFullYear()-1)+ day-daySetAsInitial))
          }
          setInitialTime(day)
      }
  },[modalConfirmation])

  function start() {
      setModal(prevModal => !prevModal)
      setDisabled(prevDisabled => !prevDisabled)
      let getStartDay = new Date()
      setInitialTime(() => {
          var now = new Date();
          var start = new Date(now.getFullYear(), 0, 0);
          var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
          var oneDay = 1000 * 60 * 60 * 24;
          var day = Math.floor(diff / oneDay);
          return day
      })
      setStartDay(getStartDay.toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric' }))
  }

  function checkPosition() {
      let value = parseInt(currentValue)
      let now = new Date();
      let start = new Date(now.getFullYear(), 0, 0);
      let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      let oneDay = 1000 * 60 * 60 * 24;
      let day = Math.floor(diff / oneDay);
      
      if(value === position + 1 && !dayChecked){
          setPosition(prevPosition => prevPosition + 1)
          setModalConfirmation(prevModalConfirmation =>!prevModalConfirmation)
          setDayChecked(true)
          setTokens(prevTokens => prevTokens + value)
          setAccomplished(prevAccomplished => {
              prevAccomplished[value-1] = true;
              return [...prevAccomplished]
          })
      }
  }

  function restartChallenge() {
      setModalReset(prevModalReset => !prevModalReset)
      localStorage.removeItem("goal")
      localStorage.removeItem("habit")
      localStorage.removeItem("disabled")
      localStorage.removeItem("position")
      localStorage.removeItem("tokens")
      localStorage.removeItem("startDay")
      localStorage.removeItem("initialTime")
      localStorage.removeItem("accomplished")
      localStorage.removeItem("dayChecked")
      window.location.reload()
  }

  return (
    <div>
       <Head>
        <title>Board</title>
        <meta name="description" content="Ecosystem - Board" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://img.icons8.com/color/96/000000/100.png"/>
      </Head>
      <div className={modal || modalConfirmation || modalAlert || modalReset ? styles.boardOff : styles.board}>
                <div className={styles.boardTitle}>
                    <div className={styles.boardTitleNotes}>
                        <h1>100 Days Challenge</h1>
                        <div className={styles.boardGoal}>
                            <p>Goal</p>
                            <input type="text" disabled={disabled} value={goal} onChange={(e) => setGoal(e.target.value)}></input>
                        </div>
                        <div className={styles.boardHabit}>
                            <p>Daily Habit</p>
                            <input type="text" disabled={disabled} value={habit} onChange={(e) => setHabit(e.target.value)}></input>
                        </div>
                        <div className={styles.boardStartSection}>
                        <p><span>Start Date:</span> {startDay === 0 ? "Today" : startDay}</p>
                        <p><span>Tokens Earned:</span> {tokens === 0 ? "0000": tokens < 10 ? "000" + tokens : tokens < 100 ? "00" + tokens : tokens < 1000 ? "0" + tokens : tokens < 10000 ? tokens : tokens }</p>
                        <p onClick={()=>setModalReset(prevModalReset=>!prevModalReset)} className={styles.boardReset}>Reset</p>

                        <button className={styles.boardButtonStart} disabled={disabled} onClick={
                            ()=> {
                                if(JSON.parse(localStorage.getItem("goal")) === "" || JSON.parse(localStorage.getItem("habit")) === "") {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                } else {
                                    setModal(prevModal =>!prevModal)
                                }
                            }
                        }>Start Challenge</button>

                        </div>
                    </div>
                    <div className={styles.boardTitleCircles}>
                        <div className={styles.boardYou}>You</div>
                        <div className={styles.boardCan}>Can</div>
                        <div className={styles.boardDo}>Do</div>
                        <div className={styles.boardIt}>It</div>
                    </div>
                    <div className={styles.boardWallet}>
                        <button onClick={() => setConnect("...Comming Soon")}>{connect}</button>
                    </div>
                </div>

                <div className={styles.boardColumns}>
                    <div className={styles.boardColumnOne}>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={1} className={position >= 1 && accomplished[0]? styles.boardSelectedCircle :position >= 1 ? styles.boardSelectedCircleFalse:""}>1</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={2} className={position >= 2 && accomplished[1]?styles.boardSelectedCircle:position >= 2 ? styles.boardSelectedCircleFalse:""}>2</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={3} className={position >= 3 && accomplished[2]?styles.boardSelectedCircle:position >= 3 ? styles.boardSelectedCircleFalse:""}>3</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={4} className={position >= 4 && accomplished[3]?styles.boardSelectedCircle:position >= 4 ? styles.boardSelectedCircleFalse:""}>4</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={5} className={position >= 5 && accomplished[4]?styles.boardSelectedCircle:position >= 5 ? styles.boardSelectedCircleFalse:""}>5</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={6} className={position >= 6 && accomplished[5]?styles.boardSelectedCircle:position >= 6 ? styles.boardSelectedCircleFalse:""}>6</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={7} className={position >= 7 && accomplished[6]?styles.boardSelectedCircle:position >= 7 ? styles.boardSelectedCircleFalse:""}>7</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={8} className={position >= 8 && accomplished[7]?styles.boardSelectedCircle:position >= 8 ? styles.boardSelectedCircleFalse:""}>8</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={9} className={position >= 9 && accomplished[8]?styles.boardSelectedCircle:position >= 9 ? styles.boardSelectedCircleFalse:""}>9</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={10} className={position >= 10 && accomplished[9]?styles.boardSelectedCircle:position >= 10 ? styles.boardSelectedCircleFalse:""}>10</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={11} className={position >= 11 && accomplished[10]?styles.boardSelectedCircle:position >= 11 ? styles.boardSelectedCircleFalse:""}>11</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={12} className={position >= 12 && accomplished[11]?styles.boardSelectedCircle:position >= 12 ? styles.boardSelectedCircleFalse:""}>12</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={13} className={position >= 13 && accomplished[12]?styles.boardSelectedCircle:position >= 13 ? styles.boardSelectedCircleFalse:""}>13</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={14} className={position >= 14 && accomplished[13]?styles.boardSelectedCircle:position >= 14 ? styles.boardSelectedCircleFalse:""}>14</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={15} className={position >= 15 && accomplished[14]?styles.boardSelectedCircle:position >= 15 ? styles.boardSelectedCircleFalse:""}>15</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={16} className={position >= 16 && accomplished[15]?styles.boardSelectedCircle:position >= 16 ? styles.boardSelectedCircleFalse:""}>16</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={17} className={position >= 17 && accomplished[16]?styles.boardSelectedCircle:position >= 17 ? styles.boardSelectedCircleFalse:""}>17</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={18} className={position >= 18 && accomplished[17]?styles.boardSelectedCircle:position >= 18 ? styles.boardSelectedCircleFalse:""}>18</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={19} className={position >= 19 && accomplished[18]?styles.boardSelectedCircle:position >= 19 ? styles.boardSelectedCircleFalse:""}>19</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={20} className={position >= 20 && accomplished[19]?styles.boardSelectedCircle:position >= 20 ? styles.boardSelectedCircleFalse:""}>20</div>
                        </div>
                    </div>
                    <div className={styles.boardColumnTwo}>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={21} className={position >= 21 && accomplished[20]?styles.boardSelectedCircle:position >= 21 ? styles.boardSelectedCircleFalse:""}>21</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={22} className={position >= 22 && accomplished[21]?styles.boardSelectedCircle:position >= 22 ? styles.boardSelectedCircleFalse:""}>22</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={23} className={position >= 23 && accomplished[22]?styles.boardSelectedCircle:position >= 23 ? styles.boardSelectedCircleFalse:""}>23</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={24} className={position >= 24 && accomplished[23]?styles.boardSelectedCircle:position >= 24 ? styles.boardSelectedCircleFalse:""}>24</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={25} className={position >= 25 && accomplished[24]?styles.boardSelectedCircle:position >= 25 ? styles.boardSelectedCircleFalse:""}>25</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={26} className={position >= 26 && accomplished[25]?styles.boardSelectedCircle:position >= 26 ? styles.boardSelectedCircleFalse:""}>26</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={27} className={position >= 27 && accomplished[26]?styles.boardSelectedCircle:position >= 27 ? styles.boardSelectedCircleFalse:""}>27</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={28} className={position >= 28 && accomplished[27]?styles.boardSelectedCircle:position >= 28 ? styles.boardSelectedCircleFalse:""}>28</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={29} className={position >= 29 && accomplished[28]?styles.boardSelectedCircle:position >= 29 ? styles.boardSelectedCircleFalse:""}>29</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={30} className={position >= 30 && accomplished[29]?styles.boardSelectedCircle:position >= 30 ? styles.boardSelectedCircleFalse:""}>30</div>
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={31} className={position >= 31 && accomplished[30]?styles.boardSelectedCircle:position >= 31 ? styles.boardSelectedCircleFalse:""}>31</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={32} className={position >= 32 && accomplished[31]?styles.boardSelectedCircle:position >= 32 ? styles.boardSelectedCircleFalse:""}>32</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={33} className={position >= 33 && accomplished[32]?styles.boardSelectedCircle:position >= 33 ? styles.boardSelectedCircleFalse:""}>33</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={34} className={position >= 34 && accomplished[33]?styles.boardSelectedCircle:position >= 34 ? styles.boardSelectedCircleFalse:""}>34</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={35} className={position >= 35 && accomplished[34]?styles.boardSelectedCircle:position >= 35 ? styles.boardSelectedCircleFalse:""}>35</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={36} className={position >= 36 && accomplished[35]?styles.boardSelectedCircle:position >= 36 ? styles.boardSelectedCircleFalse:""}>36</div>
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={37} className={position >= 37 && accomplished[36]?styles.boardSelectedCircle:position >= 37 ? styles.boardSelectedCircleFalse:""}>37</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={38} className={position >= 38 && accomplished[37]?styles.boardSelectedCircle:position >= 38 ? styles.boardSelectedCircleFalse:""}>38</div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={39} className={position >= 39 && accomplished[38]?styles.boardSelectedCircle:position >= 39 ? styles.boardSelectedCircleFalse:""}>39</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={40} className={position >= 40 && accomplished[39]?styles.boardSelectedCircle:position >= 40 ? styles.boardSelectedCircleFalse:""}>40</div>

                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={41} className={position >= 41 && accomplished[40]?styles.boardSelectedCircle:position >= 41 ? styles.boardSelectedCircleFalse:""}>41</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={42} className={position >= 42 && accomplished[41]?styles.boardSelectedCircle:position >= 42 ? styles.boardSelectedCircleFalse:""}>42</div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={43} className={position >= 43 && accomplished[42]?styles.boardSelectedCircle:position >= 43 ? styles.boardSelectedCircleFalse:""}>43</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={44} className={position >= 44 && accomplished[43]?styles.boardSelectedCircle:position >= 44 ? styles.boardSelectedCircleFalse:""}>44</div>
    
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={45} className={position >= 45 && accomplished[44]?styles.boardSelectedCircle:position >= 45 ? styles.boardSelectedCircleFalse:""}>45</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={46} className={position >= 46 && accomplished[45]?styles.boardSelectedCircle:position >= 46 ? styles.boardSelectedCircleFalse:""}>46</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={47} className={position >= 47 && accomplished[46]?styles.boardSelectedCircle:position >= 47 ? styles.boardSelectedCircleFalse:""}>47</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={48} className={position >= 48 && accomplished[47]?styles.boardSelectedCircle:position >= 48 ? styles.boardSelectedCircleFalse:""}>48</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={49} className={position >= 49 && accomplished[48]?styles.boardSelectedCircle:position >= 49 ? styles.boardSelectedCircleFalse:""}>49</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={50} className={position >= 50 && accomplished[49]?styles.boardSelectedCircle:position >= 50 ? styles.boardSelectedCircleFalse:""}>50</div>

                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={51} className={position >= 51 && accomplished[50]?styles.boardSelectedCircle:position >= 51 ? styles.boardSelectedCircleFalse:""}>51</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={52} className={position >= 52 && accomplished[51]?styles.boardSelectedCircle:position >= 52 ? styles.boardSelectedCircleFalse:""}>52</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={53} className={position >= 53 && accomplished[52]?styles.boardSelectedCircle:position >= 53 ? styles.boardSelectedCircleFalse:""}>53</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={54} className={position >= 54 && accomplished[53]?styles.boardSelectedCircle:position >= 54 ? styles.boardSelectedCircleFalse:""}>54</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={55} className={position >= 55 && accomplished[54]?styles.boardSelectedCircle:position >= 55 ? styles.boardSelectedCircleFalse:""}>55</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={56} className={position >= 56 && accomplished[55]?styles.boardSelectedCircle:position >= 56 ? styles.boardSelectedCircleFalse:""}>56</div>

                        </div>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={57} className={position >= 57 && accomplished[56]?styles.boardSelectedCircle:position >= 57 ? styles.boardSelectedCircleFalse:""}>57</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={58} className={position >= 58 && accomplished[57]?styles.boardSelectedCircle:position >= 58 ? styles.boardSelectedCircleFalse:""}>58</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={59} className={position >= 59 && accomplished[58]?styles.boardSelectedCircle:position >= 59 ? styles.boardSelectedCircleFalse:""}>59</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={60} className={position >= 60 && accomplished[59]?styles.boardSelectedCircle:position >= 60 ? styles.boardSelectedCircleFalse:""}>60</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                    </div>
                    <div className={styles.boardColumnThree}>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={61} className={position >= 61 && accomplished[60]?styles.boardSelectedCircle:position >= 61 ? styles.boardSelectedCircleFalse:""}>61</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={62} className={position >= 62 && accomplished[61]?styles.boardSelectedCircle:position >= 62 ? styles.boardSelectedCircleFalse:""}>62</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={63} className={position >= 63 && accomplished[62]?styles.boardSelectedCircle:position >= 63 ? styles.boardSelectedCircleFalse:""}>63</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={64} className={position >= 64 && accomplished[63]?styles.boardSelectedCircle:position >= 64 ? styles.boardSelectedCircleFalse:""}>64</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={65} className={position >= 65 && accomplished[64]?styles.boardSelectedCircle:position >= 65 ? styles.boardSelectedCircleFalse:""}>65</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={66} className={position >= 66 && accomplished[65]?styles.boardSelectedCircle:position >= 66 ? styles.boardSelectedCircleFalse:""}>66</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={67} className={position >= 67 && accomplished[66]?styles.boardSelectedCircle:position >= 67 ? styles.boardSelectedCircleFalse:""}>67</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={68} className={position >= 68 && accomplished[67]?styles.boardSelectedCircle:position >= 68 ? styles.boardSelectedCircleFalse:""}>68</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={69} className={position >= 69 && accomplished[68]?styles.boardSelectedCircle:position >= 69 ? styles.boardSelectedCircleFalse:""}>69</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={70} className={position >= 70 && accomplished[69]?styles.boardSelectedCircle:position >= 70 ? styles.boardSelectedCircleFalse:""}>70</div>
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={71} className={position >= 71 && accomplished[70]?styles.boardSelectedCircle:position >= 71 ? styles.boardSelectedCircleFalse:""}>71</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={72} className={position >= 72 && accomplished[71]?styles.boardSelectedCircle:position >= 72 ? styles.boardSelectedCircleFalse:""}>72</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={73} className={position >= 73 && accomplished[72]?styles.boardSelectedCircle:position >= 73 ? styles.boardSelectedCircleFalse:""}>73</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={74} className={position >= 74 && accomplished[73]?styles.boardSelectedCircle:position >= 74 ? styles.boardSelectedCircleFalse:""}>74</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={75} className={position >= 75 && accomplished[74]?styles.boardSelectedCircle:position >= 75 ? styles.boardSelectedCircleFalse:""}>75</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={76} className={position >= 76 && accomplished[75]?styles.boardSelectedCircle:position >= 76 ? styles.boardSelectedCircleFalse:""}>76</div>
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={77} className={position >= 77 && accomplished[76]?styles.boardSelectedCircle:position >= 77 ? styles.boardSelectedCircleFalse:""}>77</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={78} className={position >= 78 && accomplished[77]?styles.boardSelectedCircle:position >= 78 ? styles.boardSelectedCircleFalse:""}>78</div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={79} className={position >= 79 && accomplished[78]?styles.boardSelectedCircle:position >= 79 ? styles.boardSelectedCircleFalse:""}>79</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={80} className={position >= 80 && accomplished[79]?styles.boardSelectedCircle:position >= 80 ? styles.boardSelectedCircleFalse:""}>80</div>

                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={81} className={position >= 81 && accomplished[80]?styles.boardSelectedCircle:position >= 81 ? styles.boardSelectedCircleFalse:""}>81</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={82} className={position >= 82 & accomplished[81]?styles.boardSelectedCircle:position >= 82 ? styles.boardSelectedCircleFalse:""}>82</div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={83} className={position >= 83 && accomplished[82]?styles.boardSelectedCircle:position >= 83 ? styles.boardSelectedCircleFalse:""}>83</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={84} className={position >= 84 && accomplished[83]?styles.boardSelectedCircle:position >= 84 ? styles.boardSelectedCircleFalse:""}>84</div>
    
                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={85} className={position >= 85 && accomplished[84]?styles.boardSelectedCircle:position >= 85 ? styles.boardSelectedCircleFalse:""}>85</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={86} className={position >= 86 && accomplished[85]?styles.boardSelectedCircle:position >= 86 ? styles.boardSelectedCircleFalse:""}>86</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={87} className={position >= 87 && accomplished[86]?styles.boardSelectedCircle:position >= 87 ? styles.boardSelectedCircleFalse:""}>87</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={88} className={position >= 88 && accomplished[87]?styles.boardSelectedCircle:position >= 88 ? styles.boardSelectedCircleFalse:""}>88</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={89} className={position >= 89 && accomplished[88]?styles.boardSelectedCircle:position >= 89 ? styles.boardSelectedCircleFalse:""}>89</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={90} className={position >= 90 && accomplished[89]?styles.boardSelectedCircle:position >= 90 ? styles.boardSelectedCircleFalse:""}>90</div>

                        </div>
                        <div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={91} className={position >= 91 && accomplished[90]?styles.boardSelectedCircle:position >= 91 ? styles.boardSelectedCircleFalse:""}>91</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={92} className={position >= 92 && accomplished[91]?styles.boardSelectedCircle:position >= 92 ? styles.boardSelectedCircleFalse:""}>92</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={93} className={position >= 93 && accomplished[92]?styles.boardSelectedCircle:position >= 93 ? styles.boardSelectedCircleFalse:""}>93</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={94} className={position >= 94 && accomplished[93]?styles.boardSelectedCircle:position >= 94 ? styles.boardSelectedCircleFalse:""}>94</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={95} className={position >= 95 && accomplished[94]?styles.boardSelectedCircle:position >= 95 ? styles.boardSelectedCircleFalse:""}>95</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={96} className={position >= 96 && accomplished[95]?styles.boardSelectedCircle:position >= 96 ? styles.boardSelectedCircleFalse:""}>96</div>

                        </div>
                        <div>
                            <div className={styles.boardColumnEmpty}></div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={97} className={position >= 97 && accomplished[96]?styles.boardSelectedCircle:position >= 97 ? styles.boardSelectedCircleFalse:""}>97</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={98} className={position >= 98 && accomplished[97]?styles.boardSelectedCircle:position >= 98 ? styles.boardSelectedCircleFalse:""}>98</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={99} className={position >= 99 && accomplished[98]?styles.boardSelectedCircle:position >= 99 ? styles.boardSelectedCircleFalse:""}>99</div>
                            <div onClick={(e) => {
                                if(startDay !== 0) {
                                    setModalConfirmation(prevModalConfirmation => !prevModalConfirmation);
                                    setCurrentValue(e.target.getAttribute("data-value"))
                                } else {
                                    setModalAlert(prevModalAlert => !prevModalAlert)
                                }
                            }} data-value={100} className={position >= 100 && accomplished[99]?styles.boardSelectedCircle:position >= 100 ? styles.boardSelectedCircleFalse:""}>100</div>
                            <div className={styles.boardColumnEmpty}></div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className={modal ? styles.modalStart:styles.modalStartClosed}>
                <h1>Our Aim With This Challenge</h1>
                <p>I want you to build momentum by completing a simple and easy task on as many consecutive days as you can.</p>
                <p>In 100 days, you might see this...</p>
                <img src="./../images/challenge-completed.png"/>
                <p>If you press START, you will begin your journey to success. There's no going back.</p>
                <div>
                    <button onClick={start}>Start</button>
                    <button className={styles.modalButtonClose} onClick={()=>setModal(prevModal =>!prevModal)}>Close</button>
                </div>
            </div>
            <div className={modalConfirmation ? styles.modalEvaluation:styles.modalEvaluationClosed}>
                <button onClick={() => setModalConfirmation(prevModalConfirmation => !prevModalConfirmation)}>x</button>
                <h4>Did you manage to complete the daily task?</h4>
                <div>
                    <button onClick={checkPosition} className={styles.modalButtonYes}>Yes, I Did!</button>
                </div>
            </div>
            <div className={modalAlert ? styles.modalEvaluation:styles.modalEvaluationClosed}>
                <button onClick={() => setModalAlert(prevModalAlert => !prevModalAlert)}>x</button>
                <h4>Set a daily goal and habit, then confirm it with the Start Challenge button. </h4>
                <div>
                    <button onClick={() => setModalAlert(prevModalAlert => !prevModalAlert)} className={styles.modalButtonYes}>Ok! Let's do it.</button>
                </div>
            </div>
            <div className={modalReset ?styles.modalEvaluation:styles.modalEvaluationClosed}>
                <button onClick={() => setModalReset(prevModalReset => !prevModalReset)}>x</button>
                <h4>Are you sure you want to reset all your progress? </h4>
                <div>
                    <button onClick={restartChallenge} className={styles.modalButtonYes}>Ok. Delete all.</button>
                </div>
            </div>
    </div>
  )
}
