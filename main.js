 // l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde


$( document ).ready(function() {

  $("#inputRisposta").focus(function(){
    $(".fa-microphone").css("display","none");
    $("#footer .fa-telegram-plane").css("display","block");
  })

  $("#inputRisposta").blur(function(){
    $(".fa-microphone").css("display","block");
    $("#footer .fa-telegram-plane").css("display","none");
  })

  // creo l'evento alla pressione del tasto invio
  $("#inputRisposta").keypress(function(e) {

    // l'evento si innesca se viene premuto il tasto 13 della tastiera --> invio
    if (e.which == 13) {
      // prendo il valore di input della tastiera
      var testoRisposta = $("#inputRisposta").val();
      // ritrasformo la variabile nel div da inserire dopo gli altri messaggi
      if (testoRisposta != ""){
        // prendo l'orario della macchina tramite funzione globale
        time();

        // creo la variabile che contiene il blocco html da stampare
        var rispostaInviata =$(
        "<div class='messaggio inviato'>" +
          "<span class=\"testo-messaggio\"></span>"+
          "<span class=\"freccetta-info\"><i class=\"fas fa-chevron-down\"></i></span>"+
          "<span class=\"orario-messaggio\"></span>" +
        "</div>");

        rispostaInviata.children(".testo-messaggio").text(testoRisposta);
        rispostaInviata.children(".orario-messaggio").text(time);

        // selezionando il contenitore della chat, "appendo" ad esso il nuovo div
        $("#chat").append(rispostaInviata);
        // console.log(testoRisposta);
        $("#inputRisposta").val("");

        // impostando il timeout a 1 secondo, rischiamo la funzione che mi stamnpa la risposta
        setTimeout(rispostaRicevuta, 1000);


      } // fine ciclo if di controllo contenuto input
    } //fine ciclo if di controllo tasto premuto
  }); // fine evento keypress
}); // fine document.ready





// -----------------------------FUNZIONI GLOBALI ---------------------------------------

// funzione per il ricevimento della risposta
function rispostaRicevuta(){

  var messaggioRicevuto =$(
    "<div class='messaggio ricevuto'>" +
    "<span class=\"testo-messaggio\"></span>"+
    "<span class=\"freccetta-info\"><i class=\"fas fa-chevron-down\"></i></span>"+
    "<span class=\"orario-messaggio\"></span>" +
  "</div>");

  time();

  messaggioRicevuto.children(".testo-messaggio").text("ok");
  messaggioRicevuto.children(".orario-messaggio").text(time);
  $("#chat").append(messaggioRicevuto);
}
// --------------------------------------------------------------
// funzione per l'ottenimento del tempo attuale
function time(){
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();
  return time;
}
