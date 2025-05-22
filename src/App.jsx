import { FaHandPaper, FaHandRock, FaHandScissors } from 'react-icons/fa'
import './App.css'
import Header from './Components/Header'
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Badge } from 'react-bootstrap';
import Footer from './Components/Footer';

function App() {

  const handIcons = {
    rock: <FaHandRock />,
    paper: <FaHandPaper />,
    scissor: <FaHandScissors />
  }
  const shakeAnim = {
    animate: {
      x: [0, -10, 10, -10, 10, -5, 5, -3, 3, 0],
      transition: { duration: 1.2 }
    },
  }

  const [shake, setShake] = useState(false);
  const [playerchoice, setPlayerchoice] = useState(null)
  const [cpuChoice, setCpuChoice] = useState(null);
  const [result, setResult] = useState('')
  const [playerScore, setPlayerScore] = useState(0)
  const [cpuScore, setCpuScore] = useState(0)
  const [scoreLimit, setScoreLimit] = useState(3)
  const [scoreBoard, setScoreBoard] = useState('')
  const [isGameOver, setIsGameOver] = useState(false)
  const [welcomeMessage,setWelcomeMessage] =useState('')


  const getCpuChoice = () => {
    const options = ['rock', 'paper', 'scissor'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  useEffect(() => {
    setShake(true)
    setPlayerchoice('rock')
    setCpuChoice('rock')

    setTimeout(() => {
      setPlayerchoice('')
      setCpuChoice('')
      setWelcomeMessage('welcome')
    }, 1000);

    



  }, [])


  const handleClick = (choice) => {
    setWelcomeMessage('')
    setShake(true)
    const computerValue = getCpuChoice();

    setTimeout(() => {
      setShake(false)

      gameLogic(choice, computerValue);


      setCpuChoice(computerValue)
      setPlayerchoice(choice)

    }, 500)
  }


  const gameLogic = (playerchoice, cpuChoice) => {

    if (playerScore < scoreLimit && cpuScore < scoreLimit) {

      if (playerchoice === cpuChoice && playerchoice !== null) {

        setPlayerScore(prev => prev + 0);
        setScoreBoard('draw')
      } else if (
        (playerchoice === 'rock' && cpuChoice === 'scissor') ||
        (playerchoice === 'paper' && cpuChoice === 'rock') ||
        (playerchoice === 'scissor' && cpuChoice === 'paper')
      ) {
        setPlayerScore(prev => prev + 1);
        setScoreBoard('player scored')
      } else if (cpuChoice !== null) {
        setCpuScore(prev => prev + 1);
        setScoreBoard('CPU scored')
      }

    } else {
      if (playerScore === scoreLimit || cpuScore === scoreLimit) {
        if (playerScore > cpuScore) {
          setResult('You Win!')
          setIsGameOver(true)
        }
        else if (cpuScore > playerScore) {
          setResult('Computer Win!');
          setIsGameOver(true)

        }
        else {
          setResult('draw');
          setIsGameOver(true)

        }
      }


    }
  }


  const handleRetry = () => {
    setIsGameOver(false)
    setPlayerScore(0)
    setCpuScore(0)
    setResult('')
    setScoreBoard('')
  }




  return (
    <>
      <Header />

      <div>

        {/* score board section */}
        <div className="row mt-5">
          <div className="col-12 col-md-5">
            <h5 className='text-center '><span className='bg-success rounded px-3'>Your Score:{playerScore} </span></h5>
          </div>
          <div className="col-2 d-none d-md-block">
            <h3 className='text-center'>{result || scoreBoard}</h3>
          </div>
          <div className="col-12 col-md-5">
            <h5 className='text-center'><span className='bg-secondary rounded px-3'>CPU Score:{cpuScore}</span></h5>
          </div>
        </div>

        <div className='d-block d-md-none mt-3'>
          <h3 className='text-center'>{result || scoreBoard}</h3>
        </div>


        {/* display section */}
        <div className="row" style={{ marginTop: "100px", minHeight: "200px" }}>
          <div className="col-5 d-flex justify-content-end ">

            <motion.div
              variants={shakeAnim}
              animate={shake ? 'animate' : ''}
              onClick={handleClick}
              style={{ fontSize: '80px' }}
              className="text-danger"
            >
              {playerchoice && handIcons[playerchoice]}
            </motion.div>


          </div>

          <div className="col-2">
            <h4 className='text-center'>{welcomeMessage}</h4>
          </div>

          <div className="col-5 d-flex justify-content-start">

            <motion.div
              variants={shakeAnim}
              animate={shake ? 'animate' : ''}
              style={{ fontSize: '80px', cursor: 'pointer' }}
              className="text-danger"
            >
              {cpuChoice && handIcons[cpuChoice]}
            </motion.div>



          </div>
        </div>




        {/* selections */}

        <div className='text-center'>
          {isGameOver ? (
            <>
              <button className='btn btn-warning btn-lg mt-4' onClick={handleRetry}>
                Retry
              </button>

            </>
          ) : (
            <>
              <h5>Lock your choice</h5>
              <div className='mt-5'>
                <button className='btn' onClick={() => handleClick('rock')}><FaHandRock size={45} /></button>
                <button className='btn' onClick={() => handleClick('paper')}><FaHandPaper size={45} /></button>
                <button className='btn' onClick={() => handleClick('scissor')}><FaHandScissors size={45} /></button>
              </div>

              <button
                className='btn btn-secondary mt-5 btn-lg'
                onClick={() => setScoreLimit(prev => prev + 1)}
              >
                Score Limit:
                <Badge bg="secondary" className='ms-2'>{scoreLimit}</Badge>
              </button>
              <p className='mt-3'>Click to increase the limit</p>
            </>
          )}
        </div>



      </div>
    
    <Footer/>
      
    </>
  )
}

export default App
