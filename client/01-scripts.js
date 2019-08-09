function fetchHelloDataFromAPI() {
    fetch("http://localhost:3000/test/helloclient", {
        method: "Get",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
        .then(function (response) {
            console.log("Fetched Response:", response);
            return response.text();
        })
        .then(function (text) {
            console.log(text);
        });
}

function postToOne() {
    var url = "http://localhost:3000/test/one";
    fetch(url, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
        .then(
            function (response) {
                return response.text();
            }
        )
        .catch(
            function (error) {
                console.error("Error:", error);
            }
        )
        .then(
            function (response) {
                console.log("Success:", response)
            }
        );
}

function postToOneArrow() {
    var url = "http://localhost:3000/test/one";

    fetch(url, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
        .then(response => response.text())
        .catch(error => console.error("Error:", error))
        .then(response => console.log("Success:", response));
}

function postData() {
    let content = { testdata: { item: "This was saved." } };

    let testDataAfterFetch = document.getElementById("test-data");
    let createdAtAfterFetch = document.getElementById("created-at");

    fetch("http://localhost:3000/test/seven", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
    })
    .then(response => response.json())
    .then(function(text){
        console.log(text);
        testDataAfterFetch.innerHTML = text.testdata.testdata;
        createdAtAfterFetch.innerHTML = text.testdata.createdAt;
    });
}

function fetchFromOneDisplayData() {
    let url = "http://localhost:3000/test/one";
    let dataView = document.getElementById("display-one");

    fetch(url, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
    .then(
        function(response){
            return response.json();
        }
    )
    .catch(
        function(error) {
            console.error("Error:", error);
        }
    )
    .then(
        function(results){
            let myList = document.querySelector("#getjson");
            for(r of results) {
                console.log("Response:", r.testdata);
                var listItem = document.createElement("li");
                listItem.innerHTML = r.testdata;
                myList.appendChild(listItem);
            }
        }
    );
}