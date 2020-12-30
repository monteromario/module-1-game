window.onload = () => {
    const game = new Game('game-canvas')

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
    })

    document.querySelectorAll('#btn-r').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 82,})
        })
        })
    
    document.querySelectorAll('#btn-enter').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 13,})
        })
        })

    document.querySelectorAll('#btn-space').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 32,})
        })
        })

    document.querySelectorAll('#btn-up').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 38, type: 'keydown'})
        })
        })
    
    document.querySelectorAll('#btn-left').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 37, type: 'keydown'})
        })
        })

    document.querySelectorAll('#btn-right').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 39, type: 'keydown'})
        })
        })

    document.querySelectorAll('#btn-down').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 40, type: 'keydown'})
        })
        })
    
    document.querySelectorAll('#volume').forEach(click => {
        click.addEventListener('click', () => {
        if (VOLUME > 0) {
            game.sounds.theme.pause();
            VOLUME = 0;
            document.querySelector('#vol-ico').classList.remove("fa-volume-up");
            document.querySelector('#vol-ico').classList.add("fa-volume-mute");
            document.querySelector('#vol-ico').classList.add("red");
        } else {
            game.sounds.theme.play();
            VOLUME = 0.05;
            document.querySelector('#vol-ico').classList.remove("fa-volume-mute");
            document.querySelector('#vol-ico').classList.remove("red");
            document.querySelector('#vol-ico').classList.add("fa-volume-up");
            }
        })
        })

    document.querySelectorAll('#exit').forEach(click => {
        click.addEventListener('click', () => {
            game.sounds.thank_you.play();
            game.sounds.thank_you.volume = VOLUME
            game.ctx.save()
            game.ctx.fillStyle = 'rgba(93, 100, 117, 0.5)'
            game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height)
            clearInterval(game.drawInterval)
            game.drawInterval = undefined;
            game.ctx.restore()
            setTimeout(() => { 
                location.reload();
            }, 2500);
        })
        })

    document.querySelectorAll('#intro').forEach(click => {
        click.addEventListener('click', () => {
            game.sounds.press_start.play();
            game.sounds.press_start.volume = VOLUME
        })
        })

    document.querySelectorAll('#settings-btn').forEach(click => {
        click.addEventListener('click', () => {
            document.getElementById("intro").setAttribute("style", "display: none;");
            document.getElementById("intro_footer").setAttribute("style", "display: none;");
            document.getElementById("settings").removeAttribute("style");
            setSettingsHTML();
        })
        })

    
    document.querySelectorAll('#instructions-btn').forEach(click => {
        click.addEventListener('click', () => {
            document.getElementById("intro").setAttribute("style", "display: none;");
            document.getElementById("intro_footer").setAttribute("style", "display: none;");
            document.getElementById("instructions").removeAttribute("style");
            document.getElementById('instructions').innerHTML = `
                <div>
                <br><br>
                <p><strong>Instructions</strong></p>
                <br><br>
                </div>
                <div id="rows-div">
                <div>
                <br><br>
                <p>Move left: <i class="fas fa-arrow-left fa-lg grey"></i></p>
                <p>Move right: <i class="fas fa-arrow-right fa-lg grey"></i></p>
                <p>Move up: <i class="fas fa-arrow-up fa-lg grey"></i></p>
                <p>Move down: <i class="fas fa-arrow-down fa-lg grey"></i></p>
                <p>Fire: <i class="fas fa-arrows-alt-h fa-2x grey"></i> (space)</p>
                <br><br>
                </div>
                <div>
                <br><br>
                <p>Fire balls: <img src="assets/img/flower.png" width="25"></p>
                <p>Extra life: <img src="assets/img/mushroom.png" width="25"></p>
                <p>Invencibility: <img src="assets/img/star.png" width="25"></p>
                <p>Enemies: <img src="assets/img/enemy_1.png" width="25"> <img src="assets/img/enemy_2.png" width="20"> <img src="assets/img/enemy_3.png" width="25"></p>
                <br><br>
                </div>
                </div>
                <div>
                <br><br>
                <img src="./assets/img/macman_logo.png" width="25%">
                <p class="blink"><a id="back-btn">GO BACK</a></p>
                <br><br>
                </div>
                `;
            setBackBtn();
        })
        })

    document.querySelectorAll('#credits-btn').forEach(click => {
        click.addEventListener('click', () => {
            document.getElementById("intro").setAttribute("style", "display: none;");
            document.getElementById("intro_footer").setAttribute("style", "display: none;");
            document.getElementById("credits").removeAttribute("style");
            document.getElementById('credits').innerHTML = `
                <br><br>
                <p><strong>MAC-MAN</strong></p>
                <br><br>
                <p>Version: ${VERSION} - 2021</p>
                <br><br>
                <p>A tribute to Super Mario Bros&copy; and Pacman&copy;</p>
                <br><br>
                <p>By: <a href="http://www.mariomontero.es" target="_blank">Mario Montero</a></p>
                <br><br><br><br>
                <img src="./assets/img/macman_logo.png" width="25%">
                <br><br>
                <p class="blink"><a id="back-btn">GO BACK</a></p>`;
            setBackBtn();
        })
        })


    function setSettingsHTML() {
        document.getElementById('settings').innerHTML = `
                <br>
                <p><strong>Settings</strong></p>
                <br>
                <p id="difficulty">Difficulty: <span id="easy-btn">Easy</span> / <span id="medium-btn">Medium</span> / <span id="hard-btn">Hard</span></p>
                <br>
                <p>Movement speed: <span class="grey">${SPEED}</span></p>
                <p>Enemies max speed: <span class="grey">${ENEMIES_MAX_SPEED}</span></p>
                <p>Enemies rate: <span class="grey">x${INIT_ENEMIES}</span></p>
                <p>Lives: <span class="grey">x${LIVES}</span></p>
                <br>
                <p>Sounds: <span id="sound-on-btn" >On</span> / <span id="sound-off-btn">Off</span></p>
                <p><a id="advanced-btn">Advanced settings</a></p>
                <br>
                <img src="./assets/img/macman_logo.png" width="25%">
                <br><br>
                <p class="blink"><a id="back-btn">GO BACK</a></p>`
        setBackBtn();
        setSettingsBtn();

        document.querySelectorAll('#advanced-btn').forEach(click => {
        click.addEventListener('click', () => {
            document.getElementById("settings").setAttribute("style", "display: none;");
            document.getElementById("advanced-settings").removeAttribute("style");
            setAdvancedSettingsHTML();
        })
        })
    }

    function setAdvancedSettingsHTML() {
        document.getElementById('advanced-settings').innerHTML = `
                <br>
                <p><strong>Advanced Settings</strong></p>
                <br>
                <div id="rows-div">
                <div>
                <p>Movement speed:<br><i class="fas fa-minus-square" data-id="speed"></i> <span class="grey">${SPEED} </span><i class="fas fa-plus-square" data-id="speed"></i></p>
                <p>Enemies max speed:<br><i class="fas fa-minus-square" data-id="max-speed"></i> <span class="grey">${ENEMIES_MAX_SPEED} </span><i class="fas fa-plus-square" data-id="max-speed"></i></p>
                <p>Enemies rate:<br><i class="fas fa-minus-square" data-id="enemies"></i> <span class="grey">x${INIT_ENEMIES} </span><i class="fas fa-plus-square" data-id="enemies"></i></p>
                <p>Lives:<br><i class="fas fa-minus-square" data-id="lives"></i> <span class="grey">x${LIVES} </span><i class="fas fa-plus-square" data-id="lives"></i></p>
                <p>Mushrooms frec.:<br><i class="fas fa-minus-square" data-id="mushroom-frec"></i> <span class="grey">/${MUSHROOM_FREQ} </span><i class="fas fa-plus-square" data-id="mushroom-frec"></i></p>
                <p>Mushrooms time:<br><i class="fas fa-minus-square" data-id="mushroom-time"></i> <span class="grey">${MUSHROOM_TIME/1000} </span><i class="fas fa-plus-square" data-id="mushroom-time"></i></p>
                </div><div>
                <p>Flowers frec.:<br><i class="fas fa-minus-square" data-id="flower-frec"></i> <span class="grey">/${FLOWER_FREQ} </span><i class="fas fa-plus-square" data-id="flower-frec"></i></p>
                <p>Flowers time:<br><i class="fas fa-minus-square" data-id="flower-time"></i> <span class="grey">${FLOWER_TIME/1000} </span><i class="fas fa-plus-square" data-id="flower-time"></i></p>
                <p>Stars frec.:<br><i class="fas fa-minus-square" data-id="star-frec"></i> <span class="grey">/${STAR_FREQ} </span><i class="fas fa-plus-square" data-id="star-frec"></i></p>
                <p>Stars time:<br><i class="fas fa-minus-square" data-id="star-time"></i> <span class="grey">${STAR_TIME/1000} </span><i class="fas fa-plus-square" data-id="star-time"></i></p>
                <p>Invencibility time:<br><i class="fas fa-minus-square" data-id="invencibility-time"></i> <span class="grey">${INVENCIBLE_TIME/1000} </span><i class="fas fa-plus-square" data-id="invencibility-time"></i></p>
                <p>Volume:<br><i class="fas fa-minus-square" data-id="volume"></i> <span class="grey">${Math.round(VOLUME*100)} </span><i class="fas fa-plus-square" data-id="volume"></i></p>
                <br>
                </div></div>
                <img src="./assets/img/macman_logo.png" width="25%">
                <br><br>
                <p class="blink"><a id="back-btn">GO BACK</a></p>`
        setBackBtn();
        setAdvancedSettingsBtn();
    }
    
    function setBackBtn() {
        document.querySelectorAll('#back-btn').forEach(click => {
            click.addEventListener('click', () => {
                document.getElementById("intro").removeAttribute("style")
                document.getElementById("intro_footer").removeAttribute("style")
                document.getElementById("credits").setAttribute("style", "display: none;");
                document.getElementById("instructions").setAttribute("style", "display: none;");
                document.getElementById("settings").setAttribute("style", "display: none;");
                document.getElementById("advanced-settings").setAttribute("style", "display: none;");
            })
            })
    }

    function setSettingsBtn()  {
        document.querySelectorAll('#easy-btn').forEach(click => {
            click.addEventListener('click', () => {
                SPEED = 3
                ENEMIES_MAX_SPEED = 3
                INIT_ENEMIES = 1
                LIVES = 3
                setSettingsHTML();
                document.getElementById("medium-btn").removeAttribute("class");
                document.getElementById("hard-btn").removeAttribute("class");
                document.getElementById("easy-btn").setAttribute("class", "selected");
            })
            })

        document.querySelectorAll('#medium-btn').forEach(click => {
            click.addEventListener('click', () => {
                SPEED = 3
                ENEMIES_MAX_SPEED = 4
                INIT_ENEMIES = 1
                LIVES = 2
                setSettingsHTML();
                document.getElementById("easy-btn").removeAttribute("class");
                document.getElementById("hard-btn").removeAttribute("class");
                document.getElementById("medium-btn").setAttribute("class", "selected");
            })
            })

        document.querySelectorAll('#hard-btn').forEach(click => {
            click.addEventListener('click', () => {
                SPEED = 4
                ENEMIES_MAX_SPEED = 5
                INIT_ENEMIES = 2
                LIVES = 1
                setSettingsHTML();
                document.getElementById("easy-btn").removeAttribute("class");
                document.getElementById("medium-btn").removeAttribute("class");
                document.getElementById("hard-btn").setAttribute("class", "selected");
            })
            })

        document.querySelectorAll('#sound-on-btn').forEach(click => {
            click.addEventListener('click', () => {
                VOLUME = 0.05
                setSettingsHTML();
                document.getElementById("sound-off-btn").removeAttribute("class");
                document.getElementById("sound-on-btn").setAttribute("class", "selected");
            })
            })

        document.querySelectorAll('#sound-off-btn').forEach(click => {
            click.addEventListener('click', () => {
                VOLUME = 0
                setSettingsHTML();
                document.getElementById("sound-on-btn").removeAttribute("class");
                document.getElementById("sound-off-btn").setAttribute("class", "selected");
            })
            })
    }

    function setAdvancedSettingsBtn()  {
        document.querySelectorAll('.fa-minus-square').forEach(click => {
            click.addEventListener('click', () => {  
                switch (click.dataset.id) {
                    case 'speed':
                        if (SPEED > 1) {SPEED--}
                        break;
                    case 'max-speed':
                        if (ENEMIES_MAX_SPEED > 0) {ENEMIES_MAX_SPEED--}
                        break;
                    case 'enemies':
                        if (INIT_ENEMIES > 0) {INIT_ENEMIES--}
                        break;
                    case 'lives':
                        if (LIVES > 1) {LIVES--}
                        break;
                    case 'mushroom-frec':
                        if (MUSHROOM_FREQ > 0) {MUSHROOM_FREQ--}
                        break;
                    case 'mushroom-time':
                        if (MUSHROOM_TIME > 0) {MUSHROOM_TIME = MUSHROOM_TIME - 1000}
                        break;
                    case 'flower-frec':
                        if (FLOWER_FREQ > 0) {FLOWER_FREQ--}
                        break;
                    case 'flower-time':
                        if (FLOWER_TIME > 0) {FLOWER_TIME = FLOWER_TIME - 1000}
                        break;
                    case 'star-frec':
                        if (STAR_FREQ > 0) {STAR_FREQ--}
                        break;
                    case 'star-time':
                        if (STAR_TIME > 0) {STAR_TIME = STAR_TIME - 1000}
                        break;
                    case 'invencibility-time':
                        if (INVENCIBLE_TIME > 0) {INVENCIBLE_TIME = INVENCIBLE_TIME - 1000}
                        break;
                    case 'volume':
                        if (VOLUME > 0.009) {VOLUME = (VOLUME * 100 - 1) / 100}
                        break;
                }
                setAdvancedSettingsHTML()
            })
            })
        
       document.querySelectorAll('.fa-plus-square').forEach(click => {
            click.addEventListener('click', () => {
                switch (click.dataset.id) {
                    case 'speed':
                        SPEED++
                        break;
                    case 'max-speed':
                        ENEMIES_MAX_SPEED++
                        break;
                    case 'enemies':
                        INIT_ENEMIES++
                        break;
                    case 'lives':
                        LIVES++
                        break;
                    case 'mushroom-frec':
                        MUSHROOM_FREQ++
                        break;
                    case 'mushroom-time':
                        MUSHROOM_TIME = MUSHROOM_TIME + 1000
                        break;
                    case 'flower-frec':
                        FLOWER_FREQ++
                        break;
                    case 'flower-time':
                        FLOWER_TIME = FLOWER_TIME + 1000
                        break;
                    case 'star-frec':
                        STAR_FREQ++
                        break;
                    case 'star-time':
                        STAR_TIME = STAR_TIME + 1000
                        break;
                    case 'invencibility-time':
                        INVENCIBLE_TIME = INVENCIBLE_TIME + 1000
                        break;
                    case 'volume':
                        VOLUME = (VOLUME * 100 + 1) / 100
                        break;
                }
            setAdvancedSettingsHTML()
        })
        })   
    }
}
