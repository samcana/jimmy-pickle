export const categories = [
  'Serve', 'Return of Serve', 'Forehand', 'Backhand', 'Volleys', 'Dinking',
  'Third Shot Drop', 'Third Shot Drive', 'Resets & Defence', 'Transition Game',
  'Kitchen Line & Speed-Ups', 'Footwork & Movement', 'Doubles Strategy', 'Match Play'
]

const make = (id, title, category, level, minutes, players, objective, equipment, steps, tips, easier, harder) => ({
  id, title, category, level, minutes, players, objective, equipment, steps, tips, easier, harder
})

export const drills = [
  make('serve-targets','Serve to the Zones','Serve','Beginner',8,'1–2','Build a repeatable serve and learn to aim deep and wide.','Paddles, balls and 4 target markers',[
    'Place two targets deep in the service box: one near the middle and one near the sideline.',
    'Serve 5 balls to each target, alternating sides.',
    'Count successful serves and repeat, trying to beat the previous score.'
  ],['Use the same pre-serve routine every time.','Prioritise a high, safe contact point and a smooth swing.'],'Move the targets closer and allow a larger landing area.','Shrink the targets or call the target at the last moment.'),
  make('serve-pressure','Pressure Serve Ladder','Serve','Intermediate',10,'1–2','Practise serving accurately when the score matters.','Paddles and balls',[
    'Choose a target zone in the opposite service court.',
    'Start at 0 points. A serve in the target earns 2; a legal serve outside it earns 1; a fault loses 1.',
    'Play to 10, then switch target zones.'
  ],['Keep the toss or release consistent.','Use margin over the net rather than chasing maximum power.'],'Award 1 point for any legal serve.','Add a called score before each serve, such as 8–9 or 10–10.'),
  make('serve-depth','Deep Serve Challenge','Serve','Beginner',8,'2–4','Make opponents hit their return from behind the baseline.','Paddles, balls and cones',[
    'Mark a strip about 3 feet inside the baseline on the receiver’s side.',
    'Players take turns serving 10 balls.',
    'Award a point for each serve landing in the deep strip.'
  ],['Aim through the middle third of the court first.','A deep serve with good height is more useful than an erratic flat serve.'],'Widen the target strip.','Narrow the target and alternate forehand and backhand corners.'),
  make('return-depth','Return Deep, Recover','Return of Serve','Beginner',10,'2–4','Develop deep returns and move forward with balance.','Paddles and balls',[
    'One player serves while the receiver starts in a comfortable ready position.',
    'The receiver aims the return deep through the middle.',
    'After contact, recover forward to a balanced position behind the kitchen line.',
    'Switch roles after 8 returns.'
  ],['Make contact in front of the body.','Recover under control; do not sprint past the ball.'],'Allow a bounce and reset before each return.','Server varies serve direction and depth.'),
  make('return-crosscourt','Cross-Court Return Targets','Return of Serve','Intermediate',10,'2–4','Improve return placement and give yourself time to approach.','Paddles, balls and cones',[
    'Mark a deep cross-court target in the receiver’s diagonal service box.',
    'Serve from alternating sides.',
    'Receiver tries to land 7 of 10 returns in the target while moving forward.'
  ],['Use height and shape to create depth.','Avoid aiming too close to the sideline.'],'Make the target larger.','Add a live third shot after each return.'),
  make('forehand-wall','Forehand Groove','Forehand','Beginner',8,'1–2','Build a compact, repeatable forehand groundstroke.','Paddles and balls; wall optional',[
    'Feed a comfortable ball to the forehand side.',
    'Player sets the paddle early, turns shoulders and contacts the ball in front.',
    'Hit 10 controlled forehands cross-court, then 10 down the line.'
  ],['Finish balanced and recover to ready position.','Use legs and torso rotation rather than only the arm.'],'Self-feed or use a slower hand feed.','Alternate pace and placement based on a verbal call.'),
  make('forehand-corners','Forehand Corner Control','Forehand','Intermediate',10,'2–4','Control forehand direction without overhitting.','Paddles, balls and target cones',[
    'Feeder sends 6 balls to the forehand side.',
    'Player alternates cross-court and down-the-line targets.',
    'Score one point for the correct direction and one for landing in the target.'
  ],['Change direction with paddle angle and contact point.','Keep the swing compact.'],'Use larger target zones and predictable feeds.','Feeder varies pace, depth and placement.'),
  make('backhand-ready','Backhand Ready & Rally','Backhand','Beginner',8,'2','Build confidence with a stable backhand.','Paddles and balls',[
    'Stand opposite a partner at mid-court.',
    'Rally backhands only at a comfortable pace.',
    'Count consecutive shots, aiming for 12 controlled contacts.'
  ],['Prepare early with the paddle in front.','Keep the wrist stable and finish balanced.'],'Allow a two-handed backhand or a gentle drop feed.','Move to baseline depth and aim for a marked target.'),
  make('backhand-twohand','Two-Handed Backhand Placement','Backhand','Intermediate',10,'2–4','Improve two-handed backhand control and placement.','Paddles, balls and cones',[
    'Partner feeds 10 balls to the backhand side.',
    'Player uses a compact two-handed swing to hit cross-court.',
    'Repeat down the line, then alternate directions.'
  ],['Turn shoulders before the ball arrives.','Contact out in front; avoid reaching behind the body.'],'Feed from closer range.','Add random feeds and a recovery step after each shot.'),
  make('volley-block','Soft Hands Volley Blocks','Volleys','Beginner',8,'2','Learn to absorb pace and keep volleys low.','Paddles and balls',[
    'Partners stand at the kitchen line, about 8 feet apart.',
    'One player gently feeds waist-high balls.',
    'Receiver blocks the ball back with a quiet paddle and minimal backswing.',
    'Switch feeder after 10 balls.'
  ],['Keep the paddle face stable.','Relax the grip and let the paddle absorb pace.'],'Move closer and use slower feeds.','Feeder gradually increases pace and changes direction.'),
  make('volley-reaction','Volley Reaction Exchange','Volleys','Advanced',8,'2–4','Improve quick hands and compact volley technique.','Paddles and balls',[
    'Two players face each other at the kitchen line.',
    'Rally volleys at a controlled pace, aiming below shoulder height.',
    'After 5 consecutive contacts, feeder can vary direction.',
    'Reset if either player takes a large backswing.'
  ],['Stay low with paddle up.','Use short punches, not full swings.'],'Allow one bounce between volleys.','Add a third player as a feeder and vary pace.'),
  make('dink-crosscourt','Cross-Court Dink Rally','Dinking','Beginner',10,'2–4','Build consistency, touch and patience in the kitchen.','Paddles and balls',[
    'Two players stand diagonally opposite each other at the kitchen line.',
    'Rally soft cross-court dinks, aiming to land in the kitchen.',
    'Count consecutive dinks; aim for 20 without an error.',
    'Switch diagonal after each round.'
  ],['Use a relaxed grip and a small shoulder swing.','Let the ball drop before contacting it.'],'Move a step closer and use a larger target.','Require the ball to land within a smaller cross-court box.'),
  make('dink-direction','Dink Direction Change','Dinking','Intermediate',10,'2–4','Learn to change direction without popping the ball up.','Paddles and balls',[
    'Begin with a cooperative cross-court dink rally.',
    'After 4 dinks, the player must change direction down the line.',
    'Partner returns softly and the rally continues.',
    'Switch who initiates the change every 5 balls.'
  ],['Change direction only when balanced.','Keep the paddle path smooth and contact in front.'],'Allow a straight dink at any time.','Partner can disguise the next ball and test decision-making.'),
  make('third-drop-baseline','Third Shot Drop Ladder','Third Shot Drop','Intermediate',12,'2–4','Develop a reliable third-shot drop from the baseline.','Paddles, balls and target cones',[
    'One player starts at the baseline; partner stands at the kitchen line.',
    'Partner feeds a return-like ball to the baseline player.',
    'Baseline player attempts a soft arc that lands in the kitchen.',
    'Complete 5 successful drops before moving one step forward.'
  ],['Use a relaxed, lifting motion.','Aim for a safe arc over the net, not a flat shot.'],'Start closer to the kitchen line.','Vary feed depth and alternate forehand and backhand drops.'),
  make('third-drop-four','Four-Ball Drop Progression','Third Shot Drop','Advanced',12,'2–4','Practise drops while moving through the transition zone.','Paddles and balls',[
    'Feeder sends four balls in sequence: baseline, mid-court, transition and kitchen.',
    'Player plays a controlled drop on each ball and moves forward when appropriate.',
    'Reset and repeat from the opposite side.',
    'Score a point for each ball landing in the kitchen.'
  ],['Adjust swing size to the incoming pace.','Do not rush forward behind a poor drop.'],'Use three feeds at predictable pace.','Make the feed random and finish with a live point.'),
  make('third-drive-choice','Drive or Drop Decision','Third Shot Drive','Intermediate',12,'2–4','Recognise when to drive and when to drop.','Paddles and balls',[
    'Partner feeds a variety of short and deep returns.',
    'Player chooses a controlled drive on a high ball or a drop on a lower/deeper ball.',
    'Partner blocks or resets the drive and plays out the point.',
    'Discuss the decision after each 5-ball set.'
  ],['Choose the shot based on ball height and balance.','A drive can set up the next drop; it need not win outright.'],'Call the required shot before the feed.','Do not announce the feed; player must read it.'),
  make('drive-then-drop','Drive, Follow, Drop','Third Shot Drive','Advanced',10,'2–4','Use a drive to create a more manageable next ball.','Paddles and balls',[
    'Player at baseline drives a high, attackable feed toward the opponent.',
    'Opponent blocks the ball back softly.',
    'Attacking player plays a controlled drop into the kitchen.',
    'Continue the rally to its conclusion.'
  ],['Drive with controlled pace and a clear target.','Expect the block and prepare for the next shot.'],'Feeder gives a predictable block.','Play the point live after the block.'),
  make('reset-transition','Reset from Transition','Resets & Defence','Intermediate',12,'2–4','Neutralise attacking shots while moving toward the kitchen.','Paddles and balls',[
    'One player stands at the kitchen line; the other begins in transition.',
    'Kitchen player sends firm but controlled balls toward the transition player’s feet.',
    'Transition player absorbs pace and resets softly into the kitchen.',
    'Switch after 8 attempts.'
  ],['Use a short backswing and soft hands.','Bend knees and keep the paddle in front.'],'Feed slower balls from closer range.','Vary target between forehand and backhand hip.'),
  make('reset-three-zones','Three-Zone Reset','Resets & Defence','Advanced',12,'2–4','Practise defensive resets from different court positions.','Paddles, balls and court markers',[
    'Mark three starting positions: baseline, mid-court and transition.',
    'Feeder attacks a controlled ball to the player at each position.',
    'Player attempts to reset into the kitchen, then moves to the next zone.',
    'Complete 3 rounds from each side.'
  ],['Match the incoming pace instead of swinging harder.','Reset first; look to advance only when balanced.'],'Use only the transition position.','Feeder varies spin, speed and placement.'),
  make('transition-shuffle','Transition Shuffle & Stop','Transition Game','Beginner',8,'2–4','Move forward in control and stop before hitting.','Paddles, balls and cones',[
    'Start behind the baseline with a partner at the kitchen.',
    'Partner feeds a short ball; player moves forward with small adjustment steps.',
    'Player stops in balance, then plays a controlled drop.',
    'Repeat 8 times, alternating sides.'
  ],['Avoid hitting while running through the shot.','Use split steps as the opponent makes contact.'],'Start from mid-court.','Partner varies feed depth and direction.'),
  make('transition-two-bounce','Two-Bounce Transition','Transition Game','Intermediate',10,'2–4','Practise moving forward after a return and handling the next ball.','Paddles and balls',[
    'Player returns a deep feed and moves forward behind the shot.',
    'Feeder sends a controlled ball toward the transition zone.',
    'Player plays a drop or reset, then moves forward if balanced.',
    'Play out the point after the next shot.'
  ],['Move in stages, not in a straight sprint.','Read the opponent’s contact before advancing.'],'Use predictable feeds.','Feeder chooses between a soft drop and a firm drive.'),
  make('speedup-recognition','Attackable Ball Recognition','Kitchen Line & Speed-Ups','Intermediate',10,'2–4','Recognise high dinks that can be attacked safely.','Paddles and balls',[
    'Partners dink cooperatively cross-court.',
    'Feeder occasionally sends a higher ball above net height.',
    'Attacker speed-ups to a safe target, then both players play out the point.',
    'Switch roles after 8 feeds.'
  ],['Attack from a balanced position.','Prefer body or open-space targets over the lines.'],'Feeder calls "high" before sending the attackable ball.','Make the high ball random and disguise the feed.'),
  make('hands-battle','Hands Battle with Targets','Kitchen Line & Speed-Ups','Advanced',8,'2–4','Improve compact counters and target selection in fast exchanges.','Paddles and balls',[
    'Two players start at the kitchen line.',
    'Begin with a cooperative volley exchange.',
    'One player initiates a controlled speed-up at the body or paddle-side hip.',
    'Continue for 5 shots, then reset and switch initiator.'
  ],['Keep the paddle in front of the chest.','Use compact counters and recover immediately.'],'Slow the speed-up and allow a bounce.','Add a third player or vary attack location.'),
  make('footwork-four-corners','Four-Corner Movement','Footwork & Movement','Beginner',8,'1–4','Improve court movement, balance and recovery.','Cones and balls',[
    'Place four markers around a half-court.',
    'Player starts in the centre and moves to each called marker.',
    'At each marker, shadow a ready position and return to centre.',
    'Complete 3 rounds, resting between rounds.'
  ],['Use small adjustment steps.','Stay low and avoid crossing feet unnecessarily.'],'Walk through the pattern first.','Add a ball feed or paddle movement at each marker.'),
  make('split-step-read','Split-Step and Read','Footwork & Movement','Intermediate',8,'2–4','Time the split step and react to the opponent’s contact.','Paddles and balls',[
    'Player faces a partner who holds several balls.',
    'As the feeder makes a simulated contact, player performs a small split step.',
    'Feeder sends a ball left, right or forward; player moves and returns it.',
    'Complete 10 feeds, then switch.'
  ],['Land lightly with feet shoulder-width apart.','Split step as the opponent contacts the ball.'],'Use a verbal direction call before each feed.','Remove the verbal cue and vary the feed randomly.'),
  make('doubles-middle','Middle Ball Communication','Doubles Strategy','Beginner',10,'4','Improve communication and reduce hesitation on middle balls.','Paddles and balls',[
    'Play two against two on a half-court or full court.',
    'Feeder sends balls into the middle channel.',
    'Pairs must call "mine" or "yours" before contact.',
    'Award a point for a clear call and controlled return.'
  ],['Agree on a simple middle-ball rule before starting.','Call early and loudly.'],'Feed predictable middle balls.','Make feeds random and play the point out.'),
  make('doubles-stack','Stacking Walk-Through','Doubles Strategy','Intermediate',10,'4','Understand basic stacking movement and court coverage.','Paddles and balls',[
    'Explain each player’s preferred forehand and backhand side.',
    'Walk through the starting positions for a serve and return.',
    'Rehearse the movement after the serve or return without hitting.',
    'Add cooperative points once the pattern is clear.'
  ],['Prioritise clear communication over speed.','Check that both players know their next position.'],'Use cones to mark positions.','Run the pattern at match speed and vary the serve direction.'),
  make('play-patterns','Three-Ball Pattern Play','Match Play','Intermediate',12,'2–4','Connect serve, return and third shot into a repeatable point pattern.','Paddles and balls',[
    'Start each rally with a serve and deep return.',
    'The serving team must play a third-shot drop or drive.',
    'Play out the point normally after the third shot.',
    'Rotate roles after 5 points.'
  ],['Notice whether the third shot creates a safe approach.','Discuss one decision after each point.'],'Predetermine the third shot.','Award bonus points for a successful third-shot drop and transition.'),
  make('pressure-score','Pressure Score Scenarios','Match Play','Advanced',12,'2–4','Practise shot selection and composure in important moments.','Paddles and balls',[
    'Begin each rally with a called score such as 9–9, 10–10 or 10–8.',
    'Play a normal point, following standard scoring rules.',
    'After each point, briefly discuss the key decision.',
    'Rotate partners and repeat.'
  ],['Choose high-percentage targets under pressure.','Use a consistent between-point routine.'],'Use cooperative rallies with a target score.','Add a consequence such as changing ends or a short tie-break.'),
]