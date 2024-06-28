![Banner image of a world map](./images/banner.png)

# Believe in Serverless Framework Assessment

There are many frameworks out there that claim to be the "easiest" or "fastest" to build something. This assessment is designed to test a set of capabilities and their developer experience to objectively determine ease of use.

## GPS coordinate test

In this assessment, you will create an API that ingests GPS data and a webpage that displays it. We go beyond a simple CRUD app to veer off the happy path into a real-world scenario that involves events, real-time notifications, and an API.

### Requirements

* Build an API that implements the [API specification](./openapi.yaml) included in the repo
* When a new session is created, it must store a creation timestamp and an `active` status. Then return an identifier to the caller
* Data points must be added to valid sessions in an `active` status
* Data points must be their own record in the database and not a collection hanging on the session record itself
* When the first data point is added, asynchronously enrich the session record with current weather at the location (*can be made up, you don't have to call a weather API unless you want to*)
* Every 10 data points, asynchronously calculate the total distance and average velocity, updating the session record with the results
* Build a webpage that displays the route taken for the session on a world map
* Each data point should post a real-time notification to the map webpage that includes the latitude and longitude

### Why these requirements?

With the requirements above, an application would implement:

* A CRUDL API
* An event-driven architecture triggered by API events and data saves
* Complex data structures and indexes/collections
* Real-time notifications

This far exceeds a basic CRUD app that saves and fetches data from a database. A framework that handles the above capabilities would adequately cover many of the requirements of a production-ready application.

### Data creation

Your task is to create an API that *ingests* data, not creates it. With that in mind, this repository comes geared up with a data generator that will constantly throw data at your API.

#### What it does

The [data-generator script](./data-generator.js) will create random GPS data along a route somewhere in the United States. It posts the data points along a route to the API you created until you tell it to stop (*ctrl+c or command+c in a terminal*). Specifically, it will perform the following actions **for each data point it generates**:

* Wait randomly between 1-5 seconds
* Move north/south/east/west randomly, slightly prioritizing the last direction it went
* Travel at a random speed between 1 and 80 miles per hour
* Send a POST request to `/sessions/{sessionId}/data` with the random latitude and longitude

#### Script configuration

Before running the script, you must update it with the *baseUrl* of your API. To do this, update the `BASEURL` property on line 3 of the script with the base url of your API. *You do not need to include /sessions/{sessionId}/data in url!!!*

#### Running the script

The script accepts a single command line argument for a `sessionId`. After you create your session, you can execute the script locally. If we imagine our sessionId was *allens-session*, then the command would look like:

```bash
node .\data-generator.js allens-session
```

This script will run until you stop it manually.

### User interface

We aren't all experts at the UI. Included in this repository is [an example html file](./examples/map.html) of a rendered route. Feel free to use it as a basis for your assessment. The example uses OpenStreetMap and Leaflet for route visualization.

Consider using something like [React Leaflet](https://react-leaflet.js.org/) for easy map manipulation and [Momento Topics](https://www.gomomento.com/platform/topics) for real-time communication.

## Go on, now!

Go build it! Use this assessment to test any platform or framework of your choosing. Use it to build a standard application that you can objectively compare across multiple platforms.

Good luck and happy coding!!
