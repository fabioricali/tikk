# Tikk
Animation with requestAnimationFrame, inspired by <a target="_blank" href="https://github.com/davidkpiano/nm8">nm8</a>

## Installation

### Node.js
```
npm install tikk --save
```

### Browser

#### Local
```html
<script src="node_modules/tikk/dist/tikk.min.js"></script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/tikk/dist/tikk.min.js"></script>
```

## Example
```javascript
const Tikk = require('tikk');

// create animation
const anim = new Tikk((value, elapsed) => {
    console.log(value, elapsed);
}, 2000)
.on('play', () => {
    console.log('play')
})
.on('pause', (elapsed) => {
    console.log('pause', 'at', elapsed)
})
.on('stop', (elapsed) => {
    console.log('stop', 'at', elapsed)
});

// play animation
anim.play();

// pause animation
anim.pause();

// stop animation
anim.stop();
```

<a name="Tikk"></a>

## Tikk
**Kind**: global class  

* [Tikk](#Tikk)
    * [new Tikk(handler, duration)](#new_Tikk_new)
    * _instance_
        * [.play()](#Tikk+play) ⇒ [<code>Tikk</code>](#Tikk)
        * [.pause()](#Tikk+pause) ⇒ [<code>Tikk</code>](#Tikk)
        * [.stop()](#Tikk+stop) ⇒ [<code>Tikk</code>](#Tikk)
        * [.getState()](#Tikk+getState) ⇒ <code>string</code>
        * [.on(eventName, callback)](#Tikk+on) ⇒ [<code>Tikk</code>](#Tikk)
        * [.suspendEvent(...eventName)](#Tikk+suspendEvent) ⇒ [<code>Tikk</code>](#Tikk)
        * [.resumeEvent(...eventName)](#Tikk+resumeEvent) ⇒ [<code>Tikk</code>](#Tikk)
        * [.suspendEvents()](#Tikk+suspendEvents) ⇒ [<code>Tikk</code>](#Tikk)
        * [.resumeEvents()](#Tikk+resumeEvents) ⇒ [<code>Tikk</code>](#Tikk)
        * ["play"](#Tikk+event_play)
        * ["pause" (elapsed)](#Tikk+event_pause)
        * ["stop" (elapsed)](#Tikk+event_stop)
    * _inner_
        * [~handler](#Tikk..handler) : <code>function</code>

<a name="new_Tikk_new"></a>

### new Tikk(handler, duration)
Create instance

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>handler</td><td><code><a href="#Tikk..handler">handler</a></code></td><td></td>
    </tr><tr>
    <td>duration</td><td><code>number</code></td><td><code>0</code></td>
    </tr>  </tbody>
</table>

<a name="Tikk+play"></a>

### tikk.play() ⇒ [<code>Tikk</code>](#Tikk)
Play animation

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<a name="Tikk+pause"></a>

### tikk.pause() ⇒ [<code>Tikk</code>](#Tikk)
Pause animation

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<a name="Tikk+stop"></a>

### tikk.stop() ⇒ [<code>Tikk</code>](#Tikk)
Stop animation

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<a name="Tikk+getState"></a>

### tikk.getState() ⇒ <code>string</code>
Returns state can be play, pause, stop

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<a name="Tikk+on"></a>

### tikk.on(eventName, callback) ⇒ [<code>Tikk</code>](#Tikk)
Add event

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>callback</p>
</td>
    </tr>  </tbody>
</table>

<a name="Tikk+suspendEvent"></a>

### tikk.suspendEvent(...eventName) ⇒ [<code>Tikk</code>](#Tikk)
Suspends firing of the named event(s).

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>...eventName</td><td><code>string</code></td><td><p>multiple event names to suspend</p>
</td>
    </tr>  </tbody>
</table>

<a name="Tikk+resumeEvent"></a>

### tikk.resumeEvent(...eventName) ⇒ [<code>Tikk</code>](#Tikk)
Resumes firing of the named event(s).

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>...eventName</td><td><code>string</code></td><td><p>multiple event names to resume.</p>
</td>
    </tr>  </tbody>
</table>

<a name="Tikk+suspendEvents"></a>

### tikk.suspendEvents() ⇒ [<code>Tikk</code>](#Tikk)
Suspends all events.

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<a name="Tikk+resumeEvents"></a>

### tikk.resumeEvents() ⇒ [<code>Tikk</code>](#Tikk)
Resume all events.

**Kind**: instance method of [<code>Tikk</code>](#Tikk)  
<a name="Tikk+event_play"></a>

### "play"
Triggered at play

**Kind**: event emitted by [<code>Tikk</code>](#Tikk)  
<a name="Tikk+event_pause"></a>

### "pause" (elapsed)
Triggered at pause

**Kind**: event emitted by [<code>Tikk</code>](#Tikk)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>elapsed</td><td><code>number</code></td>
    </tr>  </tbody>
</table>

<a name="Tikk+event_stop"></a>

### "stop" (elapsed)
Triggered at stop

**Kind**: event emitted by [<code>Tikk</code>](#Tikk)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>elapsed</td><td><code>number</code></td>
    </tr>  </tbody>
</table>

<a name="Tikk..handler"></a>

### Tikk~handler : <code>function</code>
Tikk handler

**Kind**: inner typedef of [<code>Tikk</code>](#Tikk)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>value</td><td><code>number</code></td><td><p>can be offset between 0 and 1 if duration is specified or delta (in ms) if no duration is specified. Usually 16 or 17</p>
</td>
    </tr><tr>
    <td>elapsed</td><td><code>number</code></td><td><p>elapsed time</p>
</td>
    </tr>  </tbody>
</table>


## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/tikk/blob/master/CHANGELOG.md">here</a>

## License
Tikk is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>