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
			},
			modals = [];

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
			var selector = evt.currentTarget.getAttribute(options.buttonAttribute);

			return selector ? document.getElementById(selector) : evt.currentTarget;
		}

		/**
		 * Show or hide a modal (based on an Event)
		 * @param  {Objet} evt    The original event.
		 * @param  {Boolean} force the force param to pass to classList.toggle
		 * @return {Boolean}      False if something went horrible wrong
		 */
        function toggle(evt, force) {
			var modal,
				evtName;
			evt.preventDefault();

			modal = getModalFromEvent(evt);

			// We may not really have a modal
			if(!modal) {
				return false;
			}

			// If we're not closing, then we should close everything else
			if(force) {
				closeOtherModals(modal);
			}

			evtName = modal.classList.toggle(options.openClass, force) ? 'SimplestModal:afteropen' : 'SimplestModal:afterclose';
			modal.dispatchEvent(new Event(evtName));

			return true;
        }

		/**
		 * Shortcut to toggle(evt, 'add')
		 * @param  {Object} evt The original event
		 * @return {Boolean}     False if something went horribly wrong
		 */
		function open(evt) {
			return toggle(evt, true);
		}

		/**
		 * Shortcut to toggle(evt, 'add')
		 * @param  {Object} evt The original event
		 * @return {Boolean}     False if something went horribly wrong
		 */
		function close(evt) {
			return toggle(evt, false);
		}

		/**
		 * closes all modals, except one
		 * @param  {Node} modal The modal we need to ignore
		 */
		function closeOtherModals(modal) {
			for(var key in modals) {
				if(modal !== modals[key]) {
					modals[key].dispatchEvent(new Event('SimplestModal:close'));
				}
			}
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

			// Store in memory so we can access it later
			modals.push(modal);
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
