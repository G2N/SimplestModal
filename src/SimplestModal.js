(function (factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
		define(factory);
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		window.SimplestModal = factory();
	}
})(function () {
	"use strict";

    function SimplestModal(params) {
		var options,
			defaults = {
				modalSelector: '.simplest-modal',
				openClass: 'simplest-modal--open',
				buttonAttribute: 'simplest-modal'
			};

		function extend(params) {
			var options = {};

			for (var key in defaults) {
				options[key] = params.hasOwnProperty(key) ? params[key] : defaults[key];
			}

			return options;
		}

		/**
		 * Reads an event to determine the corresponding modal
		 * @param  {Object} evt The original event
		 * @return {HTMLElement}     The modal
		 */
		function getModalFromEvent(evt) {
			var selector = evt.target.getAttribute(options.buttonAttribute);

			return selector ? document.getElementById(selector) : evt.target;
		}

		/**
		 * Show or hide a modal (based on an Event)
		 * @param  {Objet} evt    The original event.
		 * @param  {String} method The name of the classList API method to call
		 *                         - 'add' to show the modal
		 *                         - 'remove' to hidden
		 *                         - 'toggle' default
		 * @return {Boolean}      False if something went horrible wrong
		 */
        function toggle(evt, method) {
			var modal;
			evt.preventDefault();

			method = method || 'toggle';
			modal = getModalFromEvent(evt);

			// We may not really have a modal or the method might not exist
			if(!modal || !modal.classList[method]) {
				return false;
			}
			return modal.classList[method](options.openClass);
        }

		/**
		 * Shortcut to toggle(evt, 'add')
		 * @param  {Object} evt The original event
		 * @return {Boolean}     False if something went horribly wrong
		 */
		function open(evt) {
			return toggle(evt, 'add');
		}

		/**
		 * Shortcut to toggle(evt, 'add')
		 * @param  {Object} evt The original event
		 * @return {Boolean}     False if something went horribly wrong
		 */
		function close(evt) {
			return toggle(evt, 'remove');
		}

		if(typeof params !== 'string') {
			options = extend(params);
		}
		else {
			options = defaults;
			options.modalSelector = params;
		}

		/**
		 * Attach event listeners to all our modals
		 */
        Array.prototype.map.call(document.querySelectorAll(options.modalSelector), function(modal) {
            modal.addEventListener('SimplestModal:open', open);
            modal.addEventListener('SimplestModal:close', close);

			// Close the modal if the background is clicked
            modal.addEventListener('click', function(evt) {
				if(evt.target === modal) {
					close(evt);
				}
			});
        });

		/**
		 * Attach event listeners to all our buttons
		 */
        Array.prototype.map.call(document.querySelectorAll('['+options.buttonAttribute+']'), function(el) {
            el.addEventListener('click', toggle);
        });
    }

return SimplestModal;
});
