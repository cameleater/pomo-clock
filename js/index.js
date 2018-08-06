var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var ClockTimer = function (_React$Component) {_inherits(ClockTimer, _React$Component);
  function ClockTimer(props) {_classCallCheck(this, ClockTimer);var _this = _possibleConstructorReturn(this, (ClockTimer.__proto__ || Object.getPrototypeOf(ClockTimer)).call(this,
    props));

    _this.handleBreakUp = _this.handleBreakUp.bind(_this);
    _this.handleBreakDown = _this.handleBreakDown.bind(_this);
    _this.handleSessionUp = _this.handleSessionUp.bind(_this);
    _this.handleSessionDown = _this.handleSessionDown.bind(_this);
    _this.handlePlayPause = _this.handlePlayPause.bind(_this);
    _this.update = _this.update.bind(_this);
    _this.handleReset = _this.handleReset.bind(_this);

    _this.state = {
      breakLength: 5,
      sessionLength: 25,
      totalSeconds: 1500,
      timeLeft: '25:00',
      lastUpdate: 0,
      isPlaying: 'stop',
      timeState: 'Session',
      timer: '' };return _this;


  }_createClass(ClockTimer, [{ key: 'componentDidMount', value: function componentDidMount()


    {var _this2 = this;
      this.interval = setInterval(function () {return _this2.update();}, 1000);
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()
    {
      clearInterval(this.interval);
    } }, { key: 'update', value: function update()

    {

      if (this.state.isPlaying == 'play') {

        var newLastUpdate = this.state.lastUpdate + 1000;
        var newSecondsLeft = this.state.totalSeconds;
        var newTimeLeft = this.state.timeLeft;
        var newTimerLabel = this.state.timeState;


        if (this.state.totalSeconds == 1) {
          document.getElementById("beep").play();
        }

        if (this.state.totalSeconds > 0) {
          newSecondsLeft -= 1;
        } else
        {
          if (this.state.timeState == "Session") {
            newTimerLabel = "Break";
            newSecondsLeft = this.state.breakLength * 60;
            newSecondsLeft -= 1;
          }
          if (this.state.timeState == "Break") {
            newTimerLabel = "Session";
            newSecondsLeft = this.state.sessionLength * 60;
            newSecondsLeft -= 1;
          }
        }

        var minutes = Math.floor(newSecondsLeft / 60);
        if (minutes < 10) {minutes = "0" + minutes;}
        var seconds = newSecondsLeft % 60;
        if (seconds < 10) {seconds = "0" + seconds;}
        newTimeLeft = minutes + ":" + seconds;

        this.setState({
          totalSeconds: newSecondsLeft,
          timeLeft: newTimeLeft,
          timeState: newTimerLabel,
          lastUpdate: newLastUpdate });

      }
    } }, { key: 'handlePlayPause', value: function handlePlayPause()

    {
      var newTimerStatus = void 0;
      var newSecondsLeft = this.state.totalSeconds;
      var newTimeLeft = this.state.timeLeft;

      if (this.state.isPlaying == 'play') {
        newTimerStatus = 'pause';

      } else if (this.state.isPlaying == 'stop') {
        newTimerStatus = 'play';
        newSecondsLeft = this.state.sessionLength * 60;
        if (this.state.sessionLength < 10)
        {newTimeLeft = "0" + this.state.sessionLength + ":" + "00";
        } else {newTimeLeft = this.state.sessionLength + ":" + "00";}
      } else if (this.state.isPlaying == "pause") {
        newTimerStatus = "play";
      }


      this.setState({
        isPlaying: newTimerStatus,
        totalSeconds: newSecondsLeft,
        timeLeft: newTimeLeft,
        lastUpdate: Date.now() });

    } }, { key: 'handleBreakUp', value: function handleBreakUp()


    {
      if (this.state.isPlaying == 'stop') {
        var val = this.state.breakLength;
        if (val < 60) {
          this.setState({
            breakLength: val + 1 });

        }
      }
    } }, { key: 'handleBreakDown', value: function handleBreakDown()

    {
      if (this.state.isPlaying == 'stop') {
        var val = this.state.breakLength;
        if (val > 1) {
          this.setState({
            breakLength: val - 1 });

        }
      }
    } }, { key: 'handleSessionUp', value: function handleSessionUp()

    {
      if (this.state.isPlaying == 'stop') {
        var val = this.state.sessionLength;
        if (val < 60) {
          var timer = val + 1 + ':00';
          this.setState({
            sessionLength: val + 1,
            timeLeft: timer });

        }
      }
    } }, { key: 'handleSessionDown', value: function handleSessionDown()

    {
      if (this.state.isPlaying == 'stop') {
        var val = this.state.sessionLength;
        if (val > 1) {
          var timer = val - 1 + ':00';
          this.setState({
            sessionLength: val - 1,
            timeLeft: timer });

        }
      }
    } }, { key: 'handleReset', value: function handleReset()

    {
      document.getElementById("beep").pause();
      document.getElementById("beep").currentTime = 0;
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        totalSeconds: 1500,
        timeLeft: '25:00',
        lastUpdate: 0,
        isPlaying: 'stop',
        timeState: 'Session',
        timer: '' });

    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', null,
          React.createElement(Inputs, { isPlaying: this.state.isPlaying, breakUp: this.handleBreakUp, breakDown: this.handleBreakDown, sessionUp: this.handleSessionUp, sessionDown: this.handleSessionDown, breakLength: this.state.breakLength, sessionLength: this.state.sessionLength }),
          React.createElement(Timer, { timeType: this.state.timeState, playPause: this.handlePlayPause, reset: this.handleReset, time: this.state.timeLeft })));


    } }]);return ClockTimer;}(React.Component);var


Inputs = function (_React$Component2) {_inherits(Inputs, _React$Component2);
  function Inputs(props) {_classCallCheck(this, Inputs);return _possibleConstructorReturn(this, (Inputs.__proto__ || Object.getPrototypeOf(Inputs)).call(this,
    props));
  }_createClass(Inputs, [{ key: 'render', value: function render()

    {
      return (
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'row labels' },
            React.createElement('p', { id: 'break-label' }, 'Break Length'),
            React.createElement('p', { id: 'session-label' }, 'Session Length')),

          React.createElement('div', { className: 'row inputs' },
            React.createElement('button', { className: 'btn btn-info', id: 'break-increment', onClick: this.props.breakUp }, '+'),
            React.createElement('div', { id: 'break-length' }, this.props.breakLength),
            React.createElement('button', { className: 'btn btn-info', id: 'break-decrement', onClick: this.props.breakDown }, '-'),


            React.createElement('button', { className: 'btn btn-info space', id: 'session-increment', onClick: this.props.sessionUp }, '+'),
            React.createElement('div', { id: 'session-length' }, this.props.sessionLength),
            React.createElement('button', { className: 'btn btn-info', id: 'session-decrement', onClick: this.props.sessionDown }, '-'))));



    } }]);return Inputs;}(React.Component);var


Timer = function (_React$Component3) {_inherits(Timer, _React$Component3);
  function Timer(props) {_classCallCheck(this, Timer);return _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this,
    props));
  }_createClass(Timer, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'row timer' },
            React.createElement('h4', { id: 'timer-label' }, this.props.timeType)),

          React.createElement('div', { className: 'row timer' },
            React.createElement('div', { id: 'time-left' }, this.props.time)),


          React.createElement('div', { className: 'row labels' },
            React.createElement('button', { className: 'btn btn-success', id: 'start_stop', onClick: this.props.playPause }, 'Start/Pause'),
            React.createElement('button', { className: 'btn btn-danger', id: 'reset', onClick: this.props.reset }, 'Reset')),

          React.createElement('audio', { id: 'beep', src: 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-fork-media/fork_media_cartoon_bubbles_bubbling.mp3?_=3' })));


    } }]);return Timer;}(React.Component);


ReactDOM.render(
React.createElement(ClockTimer, null),
document.getElementById('clocu'));