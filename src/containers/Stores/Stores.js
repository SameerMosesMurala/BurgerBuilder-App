import React, { Component } from 'react';
import  classes from './Stores.css';


class Stores extends Component {



  state = {
    venues:[],
    places:{
           hotel1:{name:'Burger Bistro',address:'1926 Market Center Blvd',lat:32.797030,lng:-96.823990,timing:'9AM-9PM'},
           hotel2:{name:'Burger Bistro',address:'3023 Inwood Rd',lat:32.825820,lng:-96.831800,timing:'9AM-9PM'},
           hotel3:{name:'Burger Bistro',address:' 5502 Harry Hines Blvd',lat:32.814800,lng:-96.840060,timing:'9AM-9PM'},
           hotel4:{name:'Burger Bistro',address:'4810 Maple Ave',lat:32.815300,lng:-96.826980,timing:'9AM-9PM'}
    }
           
  }

  componentDidMount() {
    //this.getVenues()
    this.renderMap()

  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
    window.initMap = this.initMap
  }

  // getVenues = () => {
  //   const endPoint = "https://api.foursquare.com/v2/venues/explore?"
  //   const parameters = {
  //     client_id: "04TNX5DVMYWKJZNXYSAM1YWEQWWDN2FO2X0N2OTSMJYRYKEF",
  //     client_secret: "GEDTRMNCONKMJLBNGAZQ1C4LEJD4DQC4QCV2HTCPXW3FG4KG",
  //     query: "tacos",
  //     near: "Dallas",
  //     v: "20182507"
  //   }

  //   axios.get(endPoint + new URLSearchParams(parameters))
  //     .then(response => {
  //       this.setState({
  //         venues: response.data.response.groups[0].items
  //       }, this.renderMap())
  //     })
  //     .catch(error => {
  //       console.log("ERROR!! " + error)
  //     })

  // }

  

  initMap = () => {

    // Create A Map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 32.7767, lng: -96.7970},
      zoom: 8
    })

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow()

    // Display Dynamic Markers
    //this.state.places.map(myPlace =>
    for(let myPlace in this.state.places) 
      {

      var contentString = `${this.state.places[myPlace].name}\n`+`${this.state.places[myPlace].address}`

      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: {lat:  parseFloat( this.state.places[myPlace].lat ) , lng: parseFloat( this.state.places[myPlace].lng )},
        map: map,
        title: this.state.places[myPlace].name+'\n'+this.state.places[myPlace].address
      })
      
      // Click on A Marker!
      marker.addListener('click', function() {

        // Change the content
        infowindow.setContent(contentString)

        // Open An InfoWindow
        infowindow.open(map, marker)
      })

    }
    //)

    

  }
  

  render() {
    const locationsBloacks=[];
    for(let myPlace in this.state.places) 
    {
      locationsBloacks.push(
      <section className={classes.Locations} key={this.state.places[myPlace].address}>
      <p><strong>{this.state.places[myPlace].name}</strong></p>
      <p><strong>Address:</strong>{this.state.places[myPlace].address}</p>
      <p><strong>Timings:</strong>{this.state.places[myPlace].timing}</p>
    </section>)
    }
    return (
      <div>
      <main className={classes.main}>
        <div className={classes.map} id="map"></div>
      </main>
      <section className={classes.Location}><strong>Locations</strong></section>
      {locationsBloacks}
      </div>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Stores;
