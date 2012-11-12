/**
 * jQuery Dots
 *
 * This plugin allows you to pure CSS3 animated loader on any element.
 *
 * Author: Mikita Stankevicz
 * URL: https://github.com/itsmikita/Dots
 * Version: 0.1
 */

;( function( $, window, document, undefined ) {
	/**
	 * Defaults
	 */
	var defaults = {
			opacity: 1,
			overlay: false,
			color: 'white',
			shadow: 'none',
			size: 10,
			scale: 1.5,
			speed: 200,
			zIndex: 70000
		}
	
	/**
	 * Constructor
	 */
	var Dots = function( elem, options ) {
		this.$elem = $( elem );
		this.config = $.extend( {}, defaults, options );
		
		console.log( 'Init!' );
		
		return this;
	};
	
	/**
	 * Prototype
	 */
	Dots.prototype = {
		defaults: {},
		options: {},
		config: {},
		
		/**
		 * Init
		 */
		init: function() {
			if( 'undefined' == typeof window.dotsLoaderCount )
				window.dotsLoaderCount = 0;
			
			if( 'undefined' == typeof window.dots )
				window.dots = [];
			
			this.id = this.uniqueID();
			
			this.create();
			this.spin();
		},
		
		/**
		 * Unique ID
		 */
		uniqueID: function() {
			window.dotsLoaderCount++;
			
			return 'dots_loader_' + window.dotsLoaderCount;
		},
		
		/**
		 * Create loader
		 */
		create: function() {
			var wrapperWidth = this.config.size * 5;
			
			if( false !== this.config.overlay ) {
				this.$elem.append( '<div id="' + this.id + '_overlay"></div>' );
				this.$dotsOverlay = $( '#' + this.id + '_overlay' );
				
				this.$dotsOverlay.css( {
					background: this.config.overlay,
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					zIndex: this.config.zIndex - 1,
				} );
			}
			
			this.$elem.append(
				'<div id="' + this.id + '">' +
					'<em class="dot-1"></em>' + 
					'<em class="dot-2"></em>' + 
					'<em class="dot-3"></em>' + 
				'</div>'
			);
			
			this.$elem.data( 'dots-id', this.id );
			this.$dots = $( '#' + this.id );
			this.$dots.css( {
				height: this.config.size + 'px',
				left: this.$elem.width() / 2 - ( wrapperWidth - this.config.size ) / 2 + 'px',
				position: 'absolute',
				top: this.$elem.height() / 2 - this.config.size / 2 + 'px',
				width: wrapperWidth + 'px',
				zIndex: this.config.zIndex,
			} ).find( '.dot-1, .dot-2, .dot-3' ).css( {
				background: this.config.color,
				borderRadius: '50%',
				display: 'inline-block',
				height: this.config.size + 'px',
				marginRight: this.config.size / 2 + 'px',
				width: this.config.size + 'px',
				'-webkit-transition': 'all 0.5s',
				verticalAlign: 'center',
			} );
		},
		
		spin: function() {
			var self = this;
			this.anim = setInterval( function() {
				if( 'undefined' == typeof self.currentDot || 7 == self.currentDot )
					self.currentDot = 1;
				
				self.$dots.find( '.dot-1, .dot-2, .dot-3' ).css( '-webkit-transform', 'scale( 1 )' );
				//self.$dots.find( '.dot-1, .dot-2, .dot-3' ).css( { width: self.config.size + 'px', height: self.config.size + 'px' } );
				
				if( 4 <= self.currentDot ) {
					self.currentDot++;
					return;
				}
				
				self.$dots.find( '.dot-' + self.currentDot ).css( '-webkit-transform', 'scale(' + self.config.scale + ')' );
				//self.$dots.find( '.dot-' + self.currentDot ).css( { width: self.config.size * self.config.scale + 'px', height: self.config.size * self.config.scale + 'px' } );
				self.currentDot++;
			}, this.config.speed );
			
			window.dots[ this.id ] = this;
		},
		
		destroy: function() {
			var self = window.dots[ $( this ).data( 'dots-id' ) ];
			
			clearInterval( self.anim );
			
			if( false !== self.config.overlay )
				self.$dotsOverlay.remove();
			
			self.$dots.remove();
		},
	};
	
	/**
	 * Plugin
	 */
	$.fn.dots = function() {
		var arg = arguments[0];
		
		return this.each( function() {
			if( 'string' == typeof arg )
				Dots.prototype[ arg ].apply( this );
			else
				new Dots( this, arg ).init();
		} );
	};
} )( jQuery, window, document, undefined );