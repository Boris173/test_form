import React from 'react';
import './App.css';

function Alert_message(message){
  return(
    <div className="message"> 
      {message}
    </div >
  )
}

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      surname: '',
      name: '',
      otch: '',
      gender: '',
      birthday: '',
      weight: '',
      height: '',
      life_style: '',
      life_target: '',
      itog: '0',
      showMessage: false,
      now_date: ''
    }
    
    this.onChange = this.onChange.bind(this);
    this.offMessage = this.offMessage.bind(this);
  } 
  onChange(event){  
    var mapState = {};
    mapState[event.target.name] = event.target.value;
    this.setState(mapState);      

    let v = Number(this.state.now_date.substr(0,4))-Number(this.state.birthday.substr(0,4))
    let k;
    (this.state.life_style === 'малоподвижный') ? k = 1.2 :
    (this.state.life_style === 'низкая активность') ? k = 1.375 : 
    (this.state.life_style === 'умеренная активность') ? k = 1.55 : 
    (this.state.life_style === 'активный') ? k = 1.725 : k = null;
    let c;
    (this.state.life_target === 'снижение массы тела') ? c = -500 : 
    (this.state.life_target === 'сохранение массы тела') ? c = 0 : 
    (this.state.life_target === 'увеличение массы тела') ? c = 200 : c = null;
    
    let h;
    if (this.state.height >= 50 && this.state.height <= 300)
    {h = this.state.height} else {h = null}

    let w;
    if (this.state.weight >= 50 && this.state.weight <= 300)
    {w = this.state.weight} else {w = null}

    let fam, nam;
    if (this.state.surname && this.state.surname.length && 
    this.state.name && this.state.name.length)
    {
      fam = this.state.surname;
      nam = this.state.name; 
    }
    else {
      fam = null;
      nam = null; 
    }     

    let pol = this.state.gender;

    let ir = null;    
    if (
      v !== null && v !== 2020 && k !== null && c !== null &&
      h !== null && w !== null &&
      fam !== null && nam !== null
    ) { 
      if (pol === 'мужской') {   
        ir = Number(k*(10*w)+(6,25*h)-((5*v)+5)+(c))
        this.setState({itog: ir})          
      } 
      else { 
        if (pol === 'женский') {
          ir = Number(k*(10*w)+(6,25*h)-((5*v)-16)+(c))
          this.setState({itog: ir})          
        } 
      }
    }
    else {
      this.setState({itog: '0'})
    }

    
    
  }  
  offMessage(event){
    this.setState({showMessage: event})
  } 
  componentDidMount(){
    this.setState({
      now_date:new Date().getFullYear()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getDate()
    })
  }
  
  render(){     

    return(
      <>
        <tr>
          <td>
            Фамилия
          </td><td>
            <input 
              name="surname"
              type="text" 
              size="40"
              maxLength="30"
              required pattern="[А-Я|а-я]{1,}"
              placeholder="введите Фамилию"
              value={this.props.surname} 
              onInput={this.onChange}
              />
              {
                (this.state.surname && this.state.surname.length) &&
                <span className="validity"></span> 
              }
          </td> 
        </tr>

        <tr>
          <td>
            Имя
            </td><td>
            <input 
              name="name"
              type="text" 
              size="40"
              maxLength="30"              
              required pattern="[А-Я|а-я]{1,}"
              placeholder="введите Имя"
              value={this.state.name} 
              onInput={this.onChange}
              />
              {
                (this.state.name && this.state.name.length) &&
                <span className="validity"></span> 
              }
          </td>       
        </tr>

        <tr>
          <td>
            Отчетство
            </td><td>
            <input 
              name="otch"
              type="text" 
              size="40"
              maxLength="30"              
              required pattern="[А-Я|а-я]{1,}"
              placeholder="введите Отчество"
              value={this.state.otch} 
              onInput={this.onChange}
              />
              {
                (this.state.otch && this.state.otch.length) &&
                <span className="validity"></span> 
              } 
          </td>        
        </tr>

        <tr>
          <td>
            Пол
            </td><td>
            <input 
              name="gender"
              type="text" 
              size="40"
              maxLength="35"
              placeholder="введите Пол"
              value={this.state.gender} 
              onInput={this.onChange}
              onFocus={this.offMessage}  
              />             
              {   
                this.state.showMessage 
                
                ? (this.state.gender && this.state.gender.length) && (
                  this.state.gender !== 'мужской' && this.state.gender !== 'женский'
                  ) && 
                  Alert_message("Пол: мужской или женский")
                : null
              }         
          </td>        
        </tr>

        <tr>
          <td>
            Дата рождения
            </td><td>
            <input 
              id="date_birthday"
              name="birthday"
              type="date" 
              max="1950-01-01"
              max={this.state.now_date}
              required pattern="((19|20)\d\d)-[0-9]{2}-[0-9]{2}"
              value={this.state.birthday} 
              onInput={this.onChange}
              />               
              {
                (this.state.birthday && this.state.birthday.length) &&
                <span className="validity"></span> 
              }              
          </td>        
        </tr>

        <tr>
          <td>
            Вес, кг
            </td><td>
            <input 
              id="weight"
              name="weight"
              type="number"
              step="1"
              min="50"
              max="300" 
              required             
              placeholder="введите Вес"
              value={this.state.weight} 
              onInput={this.onChange}
              />  
              {
                (this.state.weight && this.state.weight.length) &&
                <span className="validity"></span> 
              }
                 
          </td>        
        </tr>

        <tr>
          <td>
            Рост, см  
            </td><td>
            <input 
              id="height"
              name="height"
              type="number"
              step="1"
              min="50"
              max="300" 
              required
              placeholder="введите Рост"
              value={this.state.height} 
              onInput={this.onChange}
              />
              {
                (this.state.height && this.state.height.length) &&
                <span className="validity"></span> 
              }
          </td>         
        </tr>

        <tr>
          <td>
            Образ жизни
            </td><td>
            <input 
              name="life_style"
              type="text" 
              size="40"
              maxLength="35"
              placeholder="введите Образ жизни"
              value={this.state.life_style} 
              onInput={this.onChange}
              onFocus={this.offMessage}               
              />  
              {   
                this.state.showMessage 
                ? (this.state.life_style && this.state.life_style.length) && (
                  this.state.life_style !== 'малоподвижный' && this.state.life_style !== 'низкая активность' && 
                  this.state.life_style !== 'умеренная активность' && this.state.life_style !== 'активный'
                  ) && 
                  Alert_message("Варианты: малоподвижный, низкая активность, умеренная активность, активный")
                : null
              }  
          </td>        
        </tr>

        <tr>
          <td>
            Цель
            </td><td>
            <input 
              name="life_target"
              type="text" 
              size="40"
              maxLength="35"
              placeholder="введите Цель"
              value={this.state.life_target} 
              onInput={this.onChange}
              onFocus={this.offMessage} 
              />
              {   
                this.state.showMessage 
                ? (this.state.life_target && this.state.life_target.length) && (
                  this.state.life_target !== 'снижение массы тела' && this.state.life_target !== 'сохранение массы тела' && 
                  this.state.life_target !== 'увеличение массы тела'
                  ) && 
                  Alert_message("Варианты: снижение массы тела, сохранение массы тела, увеличение массы тела")
                : null
              } 
          </td>       
        </tr>

        <tr>
          <td>
            Итого
            </td><td>
            <div>{this.state.itog}</div>         
          </td>       
        </tr>

      </>  
    )
  }
}

export default App;
