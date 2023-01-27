        
        const elements = [...document.getElementsByClassName("col")]
        const btn = document.querySelector(".btn")
        const btnOk = document.getElementById("btn-ok")
        const modal = document.getElementById("modal")
        const winner = document.querySelector(".winner")
        const scores = [...document.querySelectorAll(".score-board span")]
        
        
        let player = 0
        let cpu = 0
        
        let play = 0
        
        let whoWinner = 0
        
        let running = true
        
        const listPlays=["X","O"]
        
        const combinations = [
            
            [0,1,2],
            [3,4,5],
            [6,7,8],
            
            [0,3,6],
            [1,4,7],
            [2,5,8],
            
            [0,4,8],
            [2,4,6]
        ]
        
        function hasCombination(arr){
            
            //test a array with all combinations
            return combinations.some(combination=>{
                
                return combination.every(item=>{
                    
                    const i1 = combination[0]
                    
                    const p1 = arr[i1]
                    
                    const p = arr[item]
                    
                    return (p && p === p1)
                    
                })
                
            })
            
        }
        
        function allFill(arr){
            
            return arr.every(item=>item)
            
        }
        
        function clear(){
            
            elements.map(element=>{ element.innerHTML="" })
            
            modal.style.display = "none"
            winner.innerHTML = ""
            play = whoWinner
        }
        
        function update(e){
            
            const txtPlay = e.target.innerHTML
            
            if (running){
            
                if (!txtPlay){
                    e.target.innerHTML = listPlays[play]
                }
                
                const board = elements.map(e=>e.innerHTML);
                
                if (hasCombination(board)){
                    
                    running=false
                    
                    if (play===0){
                        modal.style.display = "flex"
                        winner.setAttribute("class", "victory")
                        winner.innerHTML = "PLAYER WINN!"
                        player++
                    }
                    else {
                        modal.style.display = "flex"
                        winner.setAttribute("class", "derrote")
                        winner.innerHTML = "CPU WINN!"
                        cpu++
                    }
                    
                    whoWinner = play
    
                }
                
                else {
                    play = (play === 0)? 1: 0
                }
                
                if (allFill(board) && !hasCombination(board)){
                    
                    modal.style.display = "flex"
                    winner.setAttribute("class", "empate")
                    winner.innerHTML = "DEU VELHA!"

                }
               
            }
            
            //update score
            scores[0].innerHTML = player
            scores[1].innerHTML = cpu

        }
        
        function start(){
            
            //init
            running = true
        }
        
        function addEvents(){
            
            //add clicks in positions
            elements.map(element=>{
                element.addEventListener("click",(e)=>{update(e)})
            })
            
            //activete restart
            btn.addEventListener("click",()=>{
                clear()
                start()
            })
            
            btnOk.addEventListener("click",()=>{
                modal.style.display = "none"
                clear()
                start()
            })
            
        }
        
        window.addEventListener("load", ()=>{
            start()
            addEvents()
        })