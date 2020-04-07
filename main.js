 // l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde


$( document ).ready(function() {
  // creo l'evento alla pressione del tasto invio
  $("#inputRisposta").keypress(function(e) {

    // l'evento si innesca se viene premuto il tasto 13 della tastiera --> invio
    if (e.which == 13) {
      // prendo il valore di input della tastiera
      var testoRisposta = $("#inputRisposta").val();
      // ritrasformo la variabile nel div da inserire dopo gli altri messaggi
      if (testoRisposta != ""){
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes()
        var elementoRisposta =$(
        "<div class='messaggio inviato'>" +
          "<span class=\"testo-messaggio\"></span>"+
          "<span class=\"freccetta-info\"><i class=\"fas fa-chevron-down\"></i></span>"+
          "<span class=\"orario-messaggio\"></span>" +
        "</div>");

        elementoRisposta.children(".testo-messaggio").text(testoRisposta);
        elementoRisposta.children(".orario-messaggio").text(time);


        // selezionando il contenitore della chat, "appendo" ad esso il nuovo div
        $("#chat").append(elementoRisposta);
        // console.log(testoRisposta);
        $("#inputRisposta").val("");

      } // fine ciclo if di controllo contenuto input
    } //fine ciclo if di controllo tasto premuto
  }); // fine evento keypress
}); // fine document.ready
