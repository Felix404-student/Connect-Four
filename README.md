# Connect-Four
Connect Four assignment for UMass/Springboard Bootcamp
<p>Written in Javascript, HTML, and CSS</p>
<h3>The Game</h3>
<p>Connect Four is played on a grid, 7 wide by 6 deep, with two players,
1 (red) and 2 (blue). The players alternate turns, dropping a piece of their
color in the top of a column. The piece will fall down to the further-down
unoccupied slot.</p>
<p>The game is won when a player makes four in a row (horizontally, vertically,
or diagonally). The game is a tie if the entire board fills up without a
winner.</p>
<div class="section" id="step-one-planning">
<h3>Step One: Planning</h3>
<p><strong>Before looking at our code,</strong>
take a few minutes to think about how you would build a game like this
using HTML/JS/CSS:</p>
<ul class="simple">
<li>what HTML would be useful for the game board itself?</li>
<li>how could you represent a played-piece in the HTML board?</li>
<li>in the JavaScript, what would be a good structure for the in-memory game board?</li>
<li>what might the flow of the game be?</li>
</ul>
<p>Then, write down some functions names/descriptions that would be useful
for this game.</p>
</div>
<div class="section" id="step-two-es2015">
<h3>Step Two: ES2015</h3>
<p>This code would benefit from updating to ES2015 style — there are lots
of place where <cite>var</cite> is used that could be changed to either <cite>let</cite> or
<cite>const</cite> to improve readability. Are there other style fixes you can make?</p>
</div>
<div class="section" id="step-three-makeboard">
<h3>Step Three: <cite>makeBoard</cite></h3>
<p>The <cite>makeBoard()</cite> function needs to be implemented. It should set the global
<cite>board</cite> variable to be an array of 6 arrays (height), each containing 7 items
(width).</p>
<p>You <em>could</em> do this like:</p>
<div class="highlight-js notranslate"><div class="highlight"><pre><span></span><span class="kr">const</span> <span class="nx">board</span> <span class="o">=</span> <span class="p">[</span>
  <span class="p">[</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span> <span class="p">],</span>
  <span class="p">[</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span> <span class="p">],</span>
  <span class="p">[</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span> <span class="p">],</span>
  <span class="p">[</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span> <span class="p">],</span>
  <span class="p">[</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span> <span class="p">],</span>
  <span class="p">[</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="kc">null</span> <span class="p">],</span>
<span class="p">];</span>
</pre></div>
</div>
<p>However, it’s far better to make the game flexible about the height and width of
the board and use the <cite>WIDTH</cite> and <cite>HEIGHT</cite> constants in <cite>connect4.js</cite>. Implement
this function to make this board dynamically.</p>
</div>
<div class="section" id="step-four-makehtmlboard">
<h3>Step Four: <cite>makeHTMLBoard</cite></h3>
<p>This function is missing the first line, that sets the <cite>board</cite> variable to the
HTML board DOM node. Fix this.</p>
<p>Add comments to the code that dynamically creates the HTML table.</p>
</div>
<div class="section" id="step-five-placeintable-piece-css">
<h3>Step Five: <cite>placeInTable</cite> &amp; Piece CSS</h3>
<p>This function should add a <cite>div</cite> inside the correct <cite>td</cite> cell in the HTML game
board. This div should have the <cite>piece</cite> class on it, and should have a class
for whether the current player is 1 or 2, like <cite>p1</cite> or <cite>p2</cite>.</p>
<p>Update the CSS file to:</p>
<ul class="simple">
<li>make the piece <cite>div</cite> round, not square</li>
<li>be different colors depending on whether it’s a player #1 or #2 piece</li>
</ul>
<p>While not everything will work, you should now be able to click on a column and
see a piece appear at the very bottom of that column. (They won’t yet appear in
the right row and will always be player #1 pieces)</p>
</div>
<div class="section" id="step-six-handleclick">
<h3>Step Six: <cite>handleClick</cite></h3>
<p>There are several pieces to write/fix here:</p>
<ul class="simple">
<li>this never updates the <cite>board</cite> variable with the player #. Fix.</li>
<li>add a check for “is the entire board filled” [hint: the JS <cite>every</cite> method
on arrays would be especially nice here!]</li>
<li>add code to switch <cite>currPlayer</cite> between 1 and 2. This would be a great
place for a ternary function.</li>
</ul>
</div>
<div class="section" id="step-seven-findspotforcol-and-endgame">
<h3>Step Seven: <cite>findSpotForCol</cite> and <cite>endGame</cite></h3>
<p>Right now, the game drops always drops a piece to the top of the column,
even if a piece is already there. Fix this function so that it finds the
lowest empty spot in the game board and returns the y coordinate (or
<cite>null</cite> if the column is filled).</p>
<p>Once you have this working, make sure that when a game has ended, the endGame function runs and alerts which user has won!</p>
</div>
<div class="section" id="step-eight-celebrate">
<h3>Step Eight: CELEBRATE!</h3>
<p>If you got this far, you should have a fully functional Connect Four game.
Congratulations!</p>
</div>
</div>
<div class="section" id="further-study">
<h2>Further Study</h2>
<div class="section" id="optional-step-nine-read-comment-checkforwin">
<h3>Optional Step Nine: Read &amp; Comment <cite>checkForWin</cite></h3>
<p>The <cite>checkForWin()</cite> function is already written, but it needs comments to help
explain how it works. Add some!</p>
<p><em>Note:</em> this is a good strategy for finding a winner, but it’s not the most
efficient. Later, you may learn ways to find winners that don’t keep
re-checking the same area of the board [using techniques for “dynamic
programming”, you can make this code more efficient, though it’s much more
advanced than the rest of this exercise. You can come back to this code
much later!]</p>
</div>
<div class="section" id="optional-step-ten-add-animation">
<h3>Optional Step Ten: Add Animation!</h3>
<p>You can learn about CSS animation features (check out MDN!). If you change the
<cite>.piece</cite> divs to be positioned absolutely, you can animate the <cite>top</cite> CSS
property to animate the pieces so they appear to drop down. This is tricky,
but will give you a chance to play with animations, as well as
working with relative/absolute positioning.</p>
</div>
