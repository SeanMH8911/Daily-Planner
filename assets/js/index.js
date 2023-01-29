$(document).ready(function () {
  let tableContents = $(".container");
  const currentDay = $("#currentDay");

  let today;
  let hours = [
    "09:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "13:00 pm",
    "14:00 pm",
    "15:00 pm",
    "16:00 pm",
    "17:00 pm",
  ];
  // Sets dynamic time in jumbotron
  function todaysDate() {
    today = moment().format("dddd D MMM YYYY, HH:mm:ss a ");
    currentDay.text(today);
  }
  // Adds all elements required for time-blocks
  for (let i = 0; i < hours.length; i++) {
    let eachHour = hours[i];
    let row = $("<div>").addClass("row time-block");
    tableContents.append(row);
    let timeColumn = $("<div>").addClass("hour").text(eachHour);
    let textAreaColumn = $(`<textarea type="textarea">`)
      .addClass("textarea col-8 col-lg-10 ")
      .attr("id", eachHour);
    let saveBtn = $("<button>").addClass("saveBtn saveBtn:hover").text("Save");

    // Sets the colour of the time-blocks based on time reference
    function timeColorBlock() {
      if (eachHour > moment().format("HH:mm a")) {
        textAreaColumn.addClass("future");
      }
      if (eachHour < moment().format("HH:mm a")) {
        textAreaColumn.addClass("past");
      }
      if (eachHour >= moment().format("HH a")) {
        textAreaColumn.addClass("present");
      }
    }
    setInterval(timeColorBlock, 10000);
    timeColorBlock();

    row.append(timeColumn, textAreaColumn, saveBtn);

    // OnClick saves to local Storage
    saveBtn.on("click", () => {
      if (textAreaColumn.val()) {
        const data = localStorage.getItem("eventDiary");
        const eventDiary = data ? JSON.parse(data) : [];
        let newEvent = {
          date: moment().format("D MMM YYYY"),
          id: textAreaColumn[0].id,
          eventItem: textAreaColumn.val(),
        };
        eventDiary.push(newEvent);
        localStorage.setItem("eventDiary", JSON.stringify(eventDiary));
        alert("Item saved successfully");
      } else {
        alert("Please enter an event in allocated time-block");
      }
    });
  }

  // The function below pulls the stored
  // data from local storage and displays on screen
  let textId = $(".textarea");

  function storedData() {
    const addedEvent = JSON.parse(localStorage.getItem("eventDiary")) || "[]";
    for (let j = 0; j < textId.length; j++) {
      let textContent = textId[j];
      addedEvent.map((timeSlot) => {
        if (
          textContent.id === timeSlot.id &&
          timeSlot.date === moment().format("D MMM YYYY")
        ) {
          textContent.value = timeSlot.eventItem;
        }
      });
    }
  }

  storedData();
  setInterval(todaysDate, 1000);
});
