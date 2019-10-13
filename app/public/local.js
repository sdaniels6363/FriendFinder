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

    $.post("/api/friends", userForm).then(function(){
      console.log("New User added")
    });


  });


});