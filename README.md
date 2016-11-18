# SimplestModal.js
A super minimalist modal library.

## Usage
```html
<button simplest-modal="my-modal">Open modal</button>

<div class="simplest-modal" id="my-modal">
    Hi there, I'm a modal !
    <button simplest-modal="my-modal">Close me</button>
</div>

<script src="/js/SimplestModal.js"></script>
<script>
SimplestModal('.simplest-modal');
</script>
```

Each modal will listen to open and close events so you can programmatically
show or hide it.
```js
var modal = document.getElementById('my-modal')
modal.dispatchEvent(new Event('SimplestModal:close'))
modal.dispatchEvent(new Event('SimplestModal:close'))
```

That's it really.

Styling and animation is up to you and should be done with CSS. (See the demo).

## License
This library is licensed under the DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE.

Just do what the fuck you want with it.
