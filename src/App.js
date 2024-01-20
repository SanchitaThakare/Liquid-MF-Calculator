import { Input, Select, Switch } from '@mui/material'
import React, { Component } from 'react'
import "./App.css";

const mutual_fund = require('./mutual_fund.json');
const schemeList = require('./schemes.json');
export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      updatedSchemes: [],
      switchChecked: true,
      selectedMf: "",
      amountTxt: "",
      unitsTxt: ""
    }
  }
  onMFChange = (e) => {
    let mfId = e.target.value
    this.setState({ selectedMf: e.target.value })
    let updatedSchemes = schemeList.filter((item) => item.mfId == mfId)
    this.setState({ updatedSchemes: updatedSchemes, selectedScheme: "" })
  }
  onSchemeChange = (e) => {
    const { updatedSchemes } = this.state
    let selectedScheme = e.target.value
    let nav = updatedSchemes.filter((item) => item.scheme_code == selectedScheme)[0].nav
    this.setState({ selectNavValue: nav, selectedScheme: selectedScheme })
  }

  handleChange = (e) => {
    this.setState({ switchChecked: e.target.checked, amountTxt: "", unitsTxt: "" });
  };

  calculate = () => {
    const { selectedMf, selectedScheme, selectNavValue, amountTxt, unitsTxt, updatedSchemes, switchChecked } = this.state
    if (selectedMf == "") {
      alert("Please select Mutual Fund!")
      return
    }
    if (selectedScheme == "") {
      alert("please select scheme!")
      return
    }
    if (switchChecked && amountTxt == "") {
      alert("Please enter amount.")
      return
    }
    if (!switchChecked && unitsTxt == "") {
      alert("Please enter units.")
      return
    }

    //units=amount/nav
    if (switchChecked) {
      console.log(amountTxt);
      let units = parseFloat(amountTxt) / parseFloat(selectNavValue)
      this.setState({ unitsTxt: units })
    }
    else {
      console.log(unitsTxt);
      let amount = parseFloat(unitsTxt) * parseFloat(selectNavValue)
      this.setState({ amountTxt: amount })
    }
  }
  render() {
    const { updatedSchemes, switchChecked, unitsTxt, selectNavValue, amountTxt, selectedScheme } = this.state
    return (

      <div className="container">
        <div className="subContainer">

          <div className="heading pt-5 pb-4">
            <h2 className="">Units Calculator</h2>

          </div>

          <div className='row'>
            <select className='dropdown' onChange={(e) => this.onMFChange(e)}>
              <option value={''}>Select Mutual Fund</option>
              {mutual_fund.map((item) => (
                <option key={item.ID} value={item.ID}>
                  {item.name}
                </option>
              ))}
            </select>
            <br />
            <div>
              <select
                className='dropdown'

                onChange={(e) => this.onSchemeChange(e)}
                value={selectedScheme}
              >
                <option value={''}>Select Scheme</option>
                {updatedSchemes &&
                  updatedSchemes.map((item) => (
                    <option key={item.scheme_code} value={item.scheme_code}><li>{item.scheme_name}
                    </li>
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <label className='mainLabel' style={{
              fontSize: 16, fontWeight: '600',
              marginTop: 20, alignSelf: "center"
            }} >Current Nav Value: {selectNavValue} </label>

            <br />
            <div className=""
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <label style={{ marginRight: 10, fontWeight: 16, fontWeight: switchChecked == true ? '700' : "normal" }}>Amount</label>
              <label class="switch" >
                <input type="checkbox" checked={switchChecked} onChange={this.handleChange} />
                <span class="slider round"></span>
              </label>

              <label style={{ marginLeft: 10, fontWeight: 16, fontWeight: switchChecked == false ? '700' : "normal" }}>Units</label>
            </div>
            <div className='inputBg'>
              <label style={{ fontSize: "15px" }} >Amount</label>
              <br />
              <input
                type="text"
                value={amountTxt}
                className='amounttext'
                style={{ backgroundColor: switchChecked ? "transparent" : '#5ad2b8' }}
                onChange={(e) => this.setState({ amountTxt: e.target.value })}
                disabled={!switchChecked}
              />
            </div>

            <div className='inputBg'>
              <label style={{ fontSize: "15px" }}>Units</label>
              <br />
              <input
                type="text"
                value={unitsTxt}
                className='unittext'
                style={{ backgroundColor: !switchChecked ? "transparent" : '#5ad2b8' }}

                onChange={(e) => this.setState({ unitsTxt: e.target.value })}
                disabled={switchChecked}
              />
            </div>
            <br /><br />
            <div className="col-md-12 ">
              <div className="calculate-section">
                <button className="btn btn-primary submit-btn mb-2 btnContainer" type="submit" onClick={() => this.calculate()}>
                  <b>Calculate</b>
                </button>
                <br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
