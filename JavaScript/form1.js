window.onload = function () {
  var a = document.getElementById("form1");
  a.addEventListener("submit", function (event) {
    event.preventDefault();
    //Name
    var name = document.getElementById("textarea1").value;

    //Profile image
    let profileImageselect = document.getElementsByName("profile");
    let profileImage = "";
    for (var i of profileImageselect) {
      if (i.checked) {
        profileImage = i.value;
        console.log(i);
      }
    }

    //Gender
    let genderClicked = document.getElementsByName("forGender");
    let gender = "";
    for (var i of genderClicked) {
      if (i.checked) {
        gender = i.value;
        console.log(i);
      }
    }

    //Department
    let dept = document.getElementsByName("department");
    let departments = [];
    for (var i of dept) {
      if (i.checked) {
        departments.push(i.value);
      }
    }

    //Salary
    let salary = document.getElementById("salary").value;

    //Start date
    //day
    let day = document.getElementById("day").value;

    //month

    let month = document.getElementById("month").value;

    //year
    let year = document.getElementById("year").value;

    //Notes
    var notes = document.getElementById("textarea2").value;

    let data = {
      Name: name,
      ProfileImage: profileImage,
      Gender: gender,

      Department: JSON.stringify(departments), //converted to string
      Salary: salary,

      Date: day + "/" + month + "/" + year,

      Notes: notes,
    };
    console.log(data);

    fetch("http://localhost:3000/employee", {
      //fetch API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.ok) {
          // Request was successful
          alert("Data sent successfully");
        } else {
          // Request was not successful
          alert("Error:", response.status);
        }
      })
      .catch(function (error) {
        // An error occurred during the request
        console.error("An error occurred:", error);
      });
  });
};
