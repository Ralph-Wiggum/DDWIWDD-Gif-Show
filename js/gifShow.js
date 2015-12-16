
  /** The song DDWIWDD is 65bpm. Every half note is 1.846 sec.
   *  See: http://bradthemad.org/guitar/tempo_calculator.php */
  var halfNoteTime = 1.846;
  var animationTime = halfNoteTime * 1000;   // Converted to seconds.
  var timeBetweenSlides = halfNoteTime * 1000;
  var showCount = 0;  // 12-8-15: A unit of measurement for events seen on screen.
  var imgCount = 0;
  var animateId;  // Controlls when to end setInterval(scrollNext).
  var music = document.getElementById('musicTrack');  // 12-14-15: Switching to vanilla JS.
  var holdScenes = [15, 17, 19, 21, 23]; // These showCounts represent extended scenes.

  $( "#play" ).click(function() {
    var frameDebug = $('#goToFrame').val();
    if (frameDebug.length > 0)
      debugOn(frameDebug);
    music.play();
    scrollNext(animationTime);
    animateId = setInterval(runShow, timeBetweenSlides);
  });

  /** Debugging function:
   *  Uses global array 'holdScenes' to adjust for what image to go to. */
  function countScenesHeld(frameDebug) {
    var skipCount = 0;
    for (skipCount; skipCount < holdScenes.length; skipCount++) {
      if (frameDebug <= holdScenes[skipCount])
        break;
    }
    return skipCount;
  }

  $( "#stoup" ).click(function() {
    music.pause();
    clearInterval(animateId);
  });
  function toggleMusic() { music.muted = (!music.muted); }   // Switch on-off.

  /* TODO: Map out major events in the video. */
  function runShow() {
    nextLyric(showCount);
    showCount++;
    $('#time-debug').text(showCount);

    // Boolean controls which frames transition and how.
    var flashScene = (
      (showCount < 7 && showCount != 1) ||   // Intro.
      showCount == 16 ||
      showCount == 24   // "And like that I was torn out and thrown in the sky"
    );
    if (flashScene)
      scrollNext(0);
    else if (holdScenes.indexOf(showCount) == -1)
      scrollNext(animationTime);
  }

  $( "#mute" ).click(function() {
    toggleMusic();
  });

  var lyrics = ["","","","","","","","When I was done dying","my conscience regained","So I began my struggle","a nothingness strained","Out a flash made of time","my new form blasted out","And it startled me so","and I burst out a shout","At which my legs ran frantic","like birds from a nest","And I ran until drained","leaving no choice but rest","So I fell asleep softly","at the edge of a cave","But I should have gone in deeper","but I'm not so brave","And like that I was torn out","and thrown in the sky","And I said all my prayers","because surely I'll die","As I crashed down and smashed","into earth, into dirt","How my skin did explode","leaving only my shirt","But from shirt grew a tree","and then tree grew a fruit","And I became the seed","and that seed was a brute","And I clawed through the ground","with my roots and my leaves","And I tore up the shirt","and I ate up the sleeves","And they laughed out at me","and said \"what is your plan?\"","But their question was foreign","I could not understand","When then suddenly I'm ripped up","and placed into a mouth","And it swallowed me down","at which time I head south so I said","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Well I woke up to see them,","these two mighty steeds","With their mouths grinning wildly","expressing my needs","As they stood there above me,","being flanked on each side","I felt no need to fear them,","no reason to hide","So I reached up to touch","but they faded too soon","Yet their mouths still remained","and stacked up towards the moon","How that ladder of mouth","waved so soft in the night","And I looked up in awe","at that beautiful sight","And I dreamt about climbing","into the night sky","But I knew had I touched them","they'd mouth back 'bye bye'","So I got up and walked down","the path in the dark","And there deep in the distance","my eye caught a spark","Of a crab twice my size","with incredible strength","Oh it greeted me kindly","and then we all drank","And we drooled out together","right onto the ground","And the ocean grew up quickly","right up all around","And the earth looked at me","and said \"wasn't that fun?\"","And I replied","\"I'm sorry if I hurt anyone\"","And without even thinking","cast me into space","But before she did that","she wiped off my own face","She said better luck next time","don't worry so much","Without ears I couldn't hear","I could just feel the touch","As I feel asleep softly","at the edge of a cave","But I should have gone deeper","but I'm not so brave","I said","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey","Hey ya ya","Hey hey hey",""];
  //var lyrics = buildLyrics();

  /** Displays the next lyric at the specified index.
   *  Does nothing when called on an index out of bounds. */
  function nextLyric(index) {
    if ((index > -1) && (index < lyrics.length))
      $('#lyrics').text(lyrics[index]);
  }

  var totalImages = $('img').length;

  /** Every image frame is identified sequentially: "frame#".
   *  imgCount is number ending the image ID and is incremented.
   *  Relies on global variables: imgCount, totalImages, and animationTime. */
  function scrollNext(aTime) {
    if (imgCount == totalImages) {   // Last frame.
      imgCount = 0;   // Reset Slides
      //clearInterval(animateId);   // Stop slide anmitation.
    }
    imgCount++;
    // Vertically centering image. From: http://stackoverflow.com/a/21778615/1208507
    var $image = $('#frame' + imgCount);
    var imgOffset = $image.offset().top;
    var imgHeight = $image.height();
    var windowHeight = $(window).height();
    var offest;

    if (imgHeight < windowHeight) {
      offset = imgOffset  - ((windowHeight / 2) - (imgHeight / 2))
    } else {
      offset = imgOffset;
    }
    $('html, body').animate({ scrollTop: offset }, aTime);
  }

  /* One lyrics for every showCount.
   * Goal: When lyrics are completed, generate array once and just use that. */
  function buildLyrics() {
    var fullLyrics = ["", "", "", "", "", "", ""];  // Lyrics start at 8.
    var firstVerse = [ "When I was done dying","my conscience regained","So I began my struggle","a nothingness strained","Out a flash made of time","my new form blasted out","And it startled me so","and I burst out a shout","At which my legs ran frantic","like birds from a nest","And I ran until drained","leaving no choice but rest","So I fell asleep softly","at the edge of a cave","But I should have gone in deeper","but I'm not so brave","And like that I was torn out","and thrown in the sky","And I said all my prayers","because surely I'll die","As I crashed down and smashed","into earth, into dirt","How my skin did explode","leaving only my shirt","But from shirt grew a tree","and then tree grew a fruit","And I became the seed","and that seed was a brute","And I clawed through the ground","with my roots and my leaves","And I tore up the shirt","and I ate up the sleeves","And they laughed out at me","and said \"what is your plan?\"","But their question was foreign","I could not understand","When then suddenly I'm ripped up","and placed into a mouth","And it swallowed me down","at which time I head south so I said" ];
    Array.prototype.push.apply(fullLyrics, firstVerse);

    var chorus = [ "Hey ya ya","Hey hey hey" ];
    var chorusCount = 8;
    for (var i=0; i < chorusCount; i++) {
      Array.prototype.push.apply(fullLyrics, chorus);
    }

    var secondVerse = [ "Well I woke up to see them,","these two mighty steeds","With their mouths grinning wildly","expressing my needs","As they stood there above me,","being flanked on each side","I felt no need to fear them,","no reason to hide","So I reached up to touch","but they faded too soon","Yet their mouths still remained","and stacked up towards the moon","How that ladder of mouth","waved so soft in the night","And I looked up in awe","at that beautiful sight","And I dreamt about climbing","into the night sky","But I knew had I touched them","they'd mouth back 'bye bye'","So I got up and walked down","the path in the dark","And there deep in the distance","my eye caught a spark","Of a crab twice my size","with incredible strength","Oh it greeted me kindly","and then we all drank","And we drooled out together","right onto the ground","And the ocean grew up quickly","right up all around","And the earth looked at me","and said \"wasn't that fun?\"","And I replied","\"I'm sorry if I hurt anyone\"","And without even thinking","cast me into space","But before she did that","she wiped off my own face","She said better luck next time","don't worry so much","Without ears I couldn't hear","I could just feel the touch","As I feel asleep softly","at the edge of a cave","But I should have gone deeper","but I'm not so brave","I said" ];
    Array.prototype.push.apply(fullLyrics, secondVerse);

    for (var i=0; i < chorusCount; i++) {
      Array.prototype.push.apply(fullLyrics, chorus);
    }

    //$('#lyrics').text(JSON.stringify(fullLyrics));
    return fullLyrics;
  }

  /* 12-15-15: Jumps to the specified frame.
   * Audio, lyrics, and images are only synced with Chrome. */
  function debugOn(frameDebug) {
    frameDebug = parseInt(frameDebug, 10);
    music.currentTime = frameDebug * (halfNoteTime);
    showCount = frameDebug;

    while (frameDebug > totalImages) {
      frameDebug = frameDebug - totalImages;
    }
    imgCount = frameDebug - countScenesHeld(frameDebug);
  }
