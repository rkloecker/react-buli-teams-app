import React, { Component } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
import Header from "./components/Header";

class App extends Component {
  state = {
    liste: [],
    listeScorer: [],
    optionvalueSaison: "2003",
    optionvalueLiga: "bl1",
    errormsg: ""
  };

  showTeams = async e => {
    e.preventDefault();
    const url =
      "https://www.openligadb.de/api/getavailableteams/" +
      this.state.optionvalueLiga +
      "/" +
      this.state.optionvalueSaison;
    let api_call;
    let data;
    try {
      api_call = await fetch(url);
      data = await api_call.json();
      console.log(url);
      if (Array.isArray(data)) {
        this.setState({
          liste: data,
          errormsg: "",
          listeScorer: []
        });
      } else {
        console.log("data not array");
        console.log(data);
        this.setState({
          errormsg: "no data"
        });
      }
    } catch (error) {
      return console.log("fetch failed");
    }
  };

  showScorer = async e => {
    e.preventDefault();
    const url =
      "https://www.openligadb.de/api/getgoalgetters/" +
      this.state.optionvalueLiga +
      "/" +
      this.state.optionvalueSaison;
    let api_call;
    let data;
    try {
      api_call = await fetch(url);
      data = await api_call.json();
      console.log(url);
      console.log(data);
      if (Array.isArray(data)) {
        this.setState({
          listeScorer: data,
          liste: [],
          errormsg: ""
        });
      } else {
        console.log("data not array");
        console.log(data);
        this.setState({
          errormsg: "no data"
        });
      }
    } catch (error) {
      return console.log("fetch failed");
    }
  };

  handleChangeSaison = event => {
    this.setState({ optionvalueSaison: event.target.value }, () =>
      console.log(this.state.optionvalueSaison)
    );
  };

  handleChangeLiga = event => {
    this.setState({ optionvalueLiga: event.target.value }, () =>
      console.log(this.state.optionvalueLiga)
    );
  };

  render() {
    let listScorer = this.state.listeScorer
      .filter(el => el.GoalCount > 10)
      .sort((a, b) => b.GoalCount - a.GoalCount)
      .map(el => (
        <div className="row" key={el.TeamId}>
          <div className="col-2">{el.GoalCount}</div>
          <div className="col-6">{el.GoalGetterName}</div>
        </div>
      ));

    const listItems = this.state.liste.map(el => (
      <div className="row" key={el.TeamId}>
        <div className="col-1">
          <img src={el.TeamIconUrl} alt="" />
        </div>
        <div className="col-6">{el.TeamName}</div>
      </div>
    ));

    //calculate current year
    let currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    // month 8 is july
    // starts 2003, current is new Date().getFullYear() aber vor neuer saison;
    if (currentMonth > 7) {
      currentYear++;
    }
    const startYear = 2003;
    const diff = currentYear - startYear;

    const optionsVerein = Array(diff)
      .fill()
      .map((el, index) => (
        <option key={index} value={index + 2003}>
          {index + 2003}/{index + 2004}
        </option>
      ));

    const optionsLiga = Array(3)
      .fill()
      .map((el, index) => (
        <option key={index} value={"bl" + (index + 1)}>
          {index + 1}. Liga
        </option>
      ));

    return (
      <div className="container-fluid">
        <Header />
        <Dropdown
          txt="Liga"
          options={optionsLiga}
          handleChange={this.handleChangeLiga}
        />
        <Dropdown
          txt="Saison"
          options={optionsVerein}
          handleChange={this.handleChangeSaison}
        />

        <button className="btn btn-success mr-1" onClick={this.showTeams}>
          Teams
        </button>
        <button className="btn btn-info" onClick={this.showScorer}>
          Torschützen
        </button>
        <div className="mt-3">{listItems}</div>
        <div className="mt-3">{listScorer}</div>
        <div className="mt-3">{this.state.errormsg}</div>
      </div>
    );
  }
}

export default App;
