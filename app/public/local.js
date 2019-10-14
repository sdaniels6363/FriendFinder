function getScores(answers){
  var questions = $(".chosen-select")
  for (i=0;i<questions.length;i++){
    var question = questions[i].id;
    var score = $(`#${question}`).val();
    answers.push(score);
  }
  return answers;
}


$(document).ready(function() {


  $("#submit").on("click",function(event){
    event.preventDefault();

    var answers = []; // declare empty array for scores

    // build the JSON body to be sent in the post request.
    var userForm = {
      "name": $("#name").val(),
      "photo": $("#imgLink").val(),
      "score": getScores(answers)
    };
    console.log(userForm);

    $.post("/api/friends", userForm).then(function(response){
      console.log("New User added");
      console.log(response);

      var modalBody = `
      <h2 id="match-name">${response.name}</h2>
      <img id="match-img" src="${response.photo}"
      alt="">
      `
      $(".modal-body").append(modalBody);


    });


  });


});