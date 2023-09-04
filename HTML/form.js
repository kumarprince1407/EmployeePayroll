$(document).ready(function () {
  $("#form1").submit(function (event) {
    event.preventDefault();

    var name = $("#textarea1").val();
    var profileImage = $("input[name='profile']:checked").val();
    var gender = $("input[name='forGender']:checked").val();
    var departments = $("input[name='department']:checked")
      .map(function () {
        return $(this).val();
      })
      .get();
    var salary = $("#salary").val();
    var day = $("#day").val();
    var month = $("#month").val();
    var year = $("#year").val();
    var notes = $("#textarea2").val();

    clearAllErrorMessages(); // Clear any existing error messages

    if (name === "") {
      showError("#nameerror", "Name column should not be empty");
    }
    if (!profileImage) {
      showError("#profileerror", "Please select a profile picture");
    }
    if (!gender) {
      showError("#gendererror", "Please select a gender");
    }
    if (departments.length === 0) {
      showError("#departmenterror", "Please select at least one department");
    }
    if (salary === "0") {
      showError("#salaryerror", "Please select a valid salary");
    }
    if (day === "a" || month === "a" || year === "a") {
      showError("#dateerror", "Please select a valid date");
    }
    if (notes === "") {
      showError("#noteserror", "Notes should not be empty");
    } else {
      var data = {
        Name: name,
        ProfileImage: profileImage,
        Gender: gender,
        Department: JSON.stringify(departments),
        Salary: salary,
        Date: day + " " + month + " " + year,
        Notes: notes,
      };

      console.log(data);

      $.ajax({
        url: "http://localhost:3000/employee",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
          alert("Data sent successfully");

          // Fetch and populate the table with the updated data
          fetchEmployeeDataAndPopulateTable();
        },
        error: function (error) {
          alert("Error: " + error.status);
        },
      });
    }
  });

  function fetchEmployeeDataAndPopulateTable() {
    // Fetch employee data from the server
    $.ajax({
      url: "http://localhost:3000/employee",
      method: "GET",
      success: function (data) {
        // Populate the table with the retrieved data
        populateTable(data);
      },
      error: function (error) {
        alert("Error: " + error.status);
      },
    });
  }

  function populateTable(data) {
    var tbody = $("table tbody");
    tbody.empty(); // Clear existing table rows

    // Loop through the data and add rows to the table
    data.forEach(function (employee) {
      var row = $("<tr>");
      row.append(
        "<td><img src='" + employee.ProfileImage + "' alt='Image' /></td>"
      );
      row.append("<td>" + employee.Name + "</td>");
      row.append("<td>" + employee.Gender + "</td>");
      row.append("<td>" + JSON.parse(employee.Department).join(", ") + "</td>");
      row.append("<td>" + employee.Salary + "</td>");
      row.append("<td>" + employee.Date + "</td>");
      row.append("<td>Delete</td>"); // We can add appropriate delete functionality here
      tbody.append(row);
    });
  }

  // Function to show an error message
  function showError(element, message) {
    $(element).html("<div class='error-message'>" + message + "</div>");
  }
  // Function to clear all error messages
  function clearAllErrorMessages() {
    $(".error-message").remove();
  }
  //

  // Function to delete an employee from the server
  function deleteEmployee(employeeId) {
    $.ajax({
      url: "http://localhost:3000/employee/" + employeeId,
      method: "DELETE",
      success: function (response) {
        fetchEmployeeDataAndPopulateTable(); // Fetch and repopulate the table
      },
      error: function (error) {
        alert("Error: " + error.status);
      },
    });
  }

  // Add click event handler for delete buttons
  $("table tbody").on("click", ".delete-btn", function () {
    var employeeId = $(this).data("id");
    deleteEmployee(employeeId);
  });

  //
  // Initial fetch and populate when the page loads
  fetchEmployeeDataAndPopulateTable();
});
