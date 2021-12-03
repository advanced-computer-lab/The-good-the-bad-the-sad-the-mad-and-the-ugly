'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var ReactTooltip = _interopDefault(require('react-tooltip'));

___$insertStyle(".blank {\n  height: 28px;\n  width: 28px;\n}\n\n.loader {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  background: rgba(240, 240, 240, 0.9);\n  z-index: \"2\";\n  justify-content: center;\n  align-items: center;\n}\n\n.seat {\n  background-color: #4FC3F7;\n  height: 28px;\n  width: 28px;\n  color: #fff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.seat__number {\n  font-size: 10px;\n}\n.seat--north {\n  border-top-left-radius: 8px;\n  border-top-right-radius: 8px;\n}\n.seat--south {\n  border-bottom-left-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n.seat--east {\n  border-top-left-radius: 8px;\n  border-bottom-left-radius: 8px;\n}\n.seat--west {\n  border-top-right-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n.seat--enabled {\n  cursor: pointer;\n}\n.seat--enabled:hover {\n  background-color: #03A9F4;\n}\n.seat--selected {\n  cursor: pointer;\n  background-color: #4CAF50;\n}\n.seat--reserved {\n  cursor: not-allowed;\n  background-color: #E0E0E0;\n}\n\n.seat-content {\n  position: relative;\n  overflow: hidden;\n  margin: 0 auto;\n}\n\n.seat-picker {\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  width: max-content;\n}\n.seat-picker > *:not(:last-child) {\n  margin-bottom: 2px;\n}\n.seat-picker__row {\n  display: flex;\n  align-items: center;\n  justify-items: center;\n}\n.seat-picker__row > *:not(:last-child) {\n  margin-right: 2px;\n}\n.seat-picker__row__number {\n  font-weight: normal;\n  height: 28px;\n  width: 28px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  color: #9E9E9E;\n}\n.seat-picker__row--enabled:hover {\n  background-color: #F5F5F5;\n}\n.seat-picker__row--selected {\n  background-color: #F5F5F5;\n}\n.seat-picker__row--enabled:hover > .seat-picker__row__number {\n  font-weight: 600;\n}\n.seat-picker__row--selected > .seat-picker__row__number {\n  font-weight: 600;\n}");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var RowNumber =
/*#__PURE__*/
function (_Component) {
  _inherits(RowNumber, _Component);

  function RowNumber() {
    _classCallCheck(this, RowNumber);

    return _possibleConstructorReturn(this, _getPrototypeOf(RowNumber).apply(this, arguments));
  }

  _createClass(RowNumber, [{
    key: "render",
    value: function render() {
      return this.props.visible ? React__default.createElement("div", {
        className: "seat-picker__row__number"
      }, this.props.rowNumber) : null;
    }
  }]);

  return RowNumber;
}(React.Component);

_defineProperty(RowNumber, "propTypes", {
  rowNumber: PropTypes.string,
  visible: PropTypes.bool
});

var Row =
/*#__PURE__*/
function (_Component) {
  _inherits(Row, _Component);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, _getPrototypeOf(Row).apply(this, arguments));
  }

  _createClass(Row, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          visible = _this$props.visible,
          rowNumber = _this$props.rowNumber,
          isSelected = _this$props.isSelected;
      var className = "seat-picker__row" + (isSelected ? " seat-picker__row--selected" : " seat-picker__row--enabled");
      return React__default.createElement("div", {
        className: className
      }, React__default.createElement(RowNumber, {
        rowNumber: rowNumber,
        visible: visible
      }), this.props.children);
    }
  }]);

  return Row;
}(React.Component);

_defineProperty(Row, "propTypes", {
  rowNumber: PropTypes.string,
  visible: PropTypes.bool,
  isSelected: PropTypes.bool,
  children: PropTypes.array
});

var Seat =
/*#__PURE__*/
function (_Component) {
  _inherits(Seat, _Component);

  function Seat() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Seat);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Seat)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      !_this.props.isReserved && _this.props.selectSeat();
    });

    return _this;
  }

  _createClass(Seat, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isSelected = _this$props.isSelected,
          tooltip = _this$props.tooltip,
          isEnabled = _this$props.isEnabled,
          isReserved = _this$props.isReserved,
          orientation = _this$props.orientation;
      var className = "seat" + (isSelected ? " seat--selected" : "") + (!isSelected && isEnabled && !isReserved ? " seat--enabled" : "") + (isReserved ? " seat--reserved" : "") + " seat--".concat(!orientation ? "north" : orientation);
      return React__default.createElement("div", {
        "data-tip": tooltip,
        className: className,
        onClick: this.handleClick
      }, tooltip ? React__default.createElement(ReactTooltip, this.props.tooltipProps) : null, React__default.createElement("span", {
        className: "seat__number"
      }, this.props.seatNumber));
    }
  }]);

  return Seat;
}(React.Component);

_defineProperty(Seat, "defaultProps", {
  isSelected: false
});
Seat.propTypes = {
  isSelected: PropTypes.bool,
  isReserved: PropTypes.bool,
  tooltip: PropTypes.string,
  isEnabled: PropTypes.bool,
  orientation: PropTypes.oneOf(["north", "south", "east", "west"]),
  seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectSeat: PropTypes.func.isRequired,
  tooltipProps: PropTypes.object
};

var Blank =
/*#__PURE__*/
function (_Component) {
  _inherits(Blank, _Component);

  function Blank() {
    _classCallCheck(this, Blank);

    return _possibleConstructorReturn(this, _getPrototypeOf(Blank).apply(this, arguments));
  }

  _createClass(Blank, [{
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        className: "blank"
      });
    }
  }]);

  return Blank;
}(React.Component);

var SeatPicker =
/*#__PURE__*/
function (_Component) {
  _inherits(SeatPicker, _Component);

  function SeatPicker(props) {
    var _this;

    _classCallCheck(this, SeatPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeatPicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getAlreadySelectedSeats", function () {
      var selectedSeats = {};
      var size = 0;
      var _this$props = _this.props,
          maxReservableSeats = _this$props.maxReservableSeats,
          alpha = _this$props.alpha,
          selectedByDefault = _this$props.selectedByDefault;

      if (selectedByDefault) {
        _this.props.rows.forEach(function (row, index) {
          var rowNumber = alpha ? String.fromCharCode("A".charCodeAt(0) + index) : (index + 1).toString();
          row.forEach(function (seat, index) {
            if (seat && seat.isSelected) {
              var seatAlreadySelected = _this.includeSeat(selectedSeats, rowNumber, seat.number);

              if (size < maxReservableSeats && !seatAlreadySelected) {
                selectedSeats = _this.addSeat(selectedSeats, rowNumber, seat.number, seat.id);
                size = size + 1;
              }
            }
          });
        });
      }

      return {
        selectedSeats: selectedSeats,
        size: size
      };
    });

    _defineProperty(_assertThisInitialized(_this), "includeSeat", function (selectedSeats, row, number) {
      if (selectedSeats[row]) {
        return !!selectedSeats[row][number];
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "addSeat", function (selectedSeats, row, number, id) {
      if (selectedSeats[row]) {
        if (!selectedSeats[row][number]) {
          selectedSeats[row][number] = id;
        }
      } else {
        selectedSeats[row] = {};
        selectedSeats[row][number] = id;
      }

      return _objectSpread2({}, selectedSeats);
    });

    _defineProperty(_assertThisInitialized(_this), "deleteSeat", function (row, number) {
      var selectedSeats = _this.state.selectedSeats;

      if (selectedSeats[row]) {
        delete selectedSeats[row][number];

        if (!Object.keys(selectedSeats[row]).length > 0) {
          delete selectedSeats[row];
        }
      }

      return _objectSpread2({}, selectedSeats);
    });

    _defineProperty(_assertThisInitialized(_this), "addTooltip", function (tooltipOverrides, row, number, tooltip) {
      if (!tooltipOverrides[row]) {
        tooltipOverrides[row] = {};
      }

      tooltipOverrides[row][number] = tooltip;
      return _objectSpread2({}, tooltipOverrides);
    });

    _defineProperty(_assertThisInitialized(_this), "acceptSelection", function (row, number, id, tooltip) {
      var _this$state = _this.state,
          selectedSeats = _this$state.selectedSeats,
          tooltipOverrides = _this$state.tooltipOverrides,
          size = _this$state.size;
      var maxReservableSeats = _this.props.maxReservableSeats;

      if (size < maxReservableSeats) {
        _this.setState({
          tooltipOverrides: _this.addTooltip(tooltipOverrides, row, number, tooltip),
          selectedSeats: _this.addSeat(selectedSeats, row, number, id),
          size: size + 1
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "acceptDeselection", function (row, number, tooltip) {
      var _this$state2 = _this.state,
          size = _this$state2.size,
          tooltipOverrides = _this$state2.tooltipOverrides;

      _this.setState({
        tooltipOverrides: _this.addTooltip(tooltipOverrides, row, number, tooltip),
        selectedSeats: _this.deleteSeat(row, number),
        size: size - 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectSeat", function (row, number, id) {
      var selectedSeats = _this.state.selectedSeats;
      var size = _this.state.size;
      var _this$props2 = _this.props,
          maxReservableSeats = _this$props2.maxReservableSeats,
          addSeatCallback = _this$props2.addSeatCallback,
          removeSeatCallback = _this$props2.removeSeatCallback,
          continuous = _this$props2.continuous;

      var seatAlreadySelected = _this.includeSeat(selectedSeats, row, number);

      if (seatAlreadySelected) {
        removeSeatCallback({
          row: row,
          number: number,
          id: id
        }, _this.acceptDeselection);
      } else {
        if (size < maxReservableSeats) {
          addSeatCallback({
            row: row,
            number: number,
            id: id
          }, _this.acceptSelection);
        } else if (continuous) {
          var auxRow = Object.keys(selectedSeats)[0];
          var auxNumber = Object.keys(selectedSeats[auxRow])[0];
          addSeatCallback({
            row: row,
            number: number,
            id: id
          }, _this.acceptSelection, {
            row: auxRow,
            number: auxNumber,
            id: selectedSeats[auxRow][auxNumber]
          }, _this.acceptDeselection);
        }
      }
    });

    var rows = props.rows;

    var _this$getAlreadySelec = _this.getAlreadySelectedSeats(),
        _selectedSeats = _this$getAlreadySelec.selectedSeats,
        _size = _this$getAlreadySelec.size;

    _this.state = {
      tooltipOverrides: {},
      selectedSeats: _selectedSeats,
      size: _size,
      rowLength: Math.max.apply(null, rows.map(function (row) {
        return row.length;
      }))
    };
    return _this;
  }

  _createClass(SeatPicker, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.selectedSeats !== this.state.selectedSeats || this.props.loading !== nextProps.loading;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        className: "seat-content"
      }, React__default.createElement("div", {
        className: this.props.loading ? "loader" : null
      }), React__default.createElement("div", {
        className: "seat-picker"
      }, this.renderRows()));
    }
  }, {
    key: "renderRows",
    value: function renderRows() {
      var _this2 = this;

      var seats = this.state.selectedSeats;
      var _this$props3 = this.props,
          alpha = _this$props3.alpha,
          visible = _this$props3.visible;
      return this.props.rows.map(function (row, index) {
        var rowNumber = alpha ? String.fromCharCode("A".charCodeAt(0) + index) : (index + 1).toString();
        var isSelected = !!seats[rowNumber];
        var props = {
          visible: visible,
          rowNumber: rowNumber,
          isSelected: isSelected,
          selectedSeat: null,
          seats: row,
          // key: `Row${rowNumber}`,
          selectSeat: _this2.selectSeat
        };
        return React__default.createElement(Row, _extends({
          key: index
        }, props), _this2.renderSeats(row, rowNumber, isSelected), " ");
      });
    }
  }, {
    key: "renderSeats",
    value: function renderSeats(seats, rowNumber, isRowSelected) {
      var _this3 = this;

      var _this$state3 = this.state,
          selectedSeats = _this$state3.selectedSeats,
          size = _this$state3.size,
          rowLength = _this$state3.rowLength,
          tooltipOverrides = _this$state3.tooltipOverrides;
      var _this$props4 = this.props,
          maxReservableSeats = _this$props4.maxReservableSeats,
          continuous = _this$props4.continuous;
      var blanks = new Array(rowLength - seats.length > 0 ? rowLength - seats.length : 0).fill(0);
      var row = seats.map(function (seat, index) {
        if (seat === null) return React__default.createElement(Blank, {
          key: index
        });

        var isSelected = isRowSelected && _this3.includeSeat(selectedSeats, rowNumber, seat.number);

        var tooltip = seat.tooltip;

        if (tooltipOverrides[rowNumber] && tooltipOverrides[rowNumber][seat.number] != null) {
          tooltip = tooltipOverrides[rowNumber][seat.number];
        }

        var props = {
          isSelected: isSelected,
          orientation: seat.orientation,
          isReserved: seat.isReserved,
          tooltip: tooltip,
          isEnabled: size < maxReservableSeats || continuous,
          selectSeat: _this3.selectSeat.bind(_this3, rowNumber, seat.number, seat.id),
          seatNumber: seat.number,
          tooltipProps: _this3.props.tooltipProps
        };
        return React__default.createElement(Seat, _extends({
          key: index
        }, props));
      });

      if (blanks.length > 0) {
        blanks.forEach(function (blank, index) {
          row.push(React__default.createElement(Blank, {
            key: row.length + index + 1
          }));
        });
      }

      return row;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.maxReservableSeats < state.size) {
        var sum = 0;
        var selectedSeats = {};

        for (var array in state.selectedSeats) {
          if (sum + state.selectedSeats[array].length < props.maxReservableSeats) {
            selectedSeats[array] = state.selectedSeats[array].slice(0);
          } else {
            var dif = props.maxReservableSeats - sum;
            selectedSeats[array] = state.selectedSeats[array].slice(0, dif);
            return {
              selectedSeats: selectedSeats,
              size: props.maxReservableSeats
            };
          }

          sum = sum + state.selectedSeats[array].length;
        }
      }

      return null;
    }
  }]);

  return SeatPicker;
}(React.Component);

_defineProperty(SeatPicker, "defaultProps", {
  addSeatCallback: function addSeatCallback(_ref, addCb) {
    var row = _ref.row,
        number = _ref.number,
        id = _ref.id;
    console.log("Added seat ".concat(number, ", row ").concat(row, ", id ").concat(id));
    addCb(row, number, id);
  },
  removeSeatCallback: function removeSeatCallback(_ref2, removeCb) {
    var row = _ref2.row,
        number = _ref2.number,
        id = _ref2.id;
    console.log("Removed seat ".concat(number, ", row ").concat(row, ", id ").concat(id));
    removeCb(row, number);
  },
  maxReservableSeats: 0
});

SeatPicker.propTypes = {
  addSeatCallback: PropTypes.func,
  alpha: PropTypes.bool,
  visible: PropTypes.bool,
  continuous: PropTypes.bool,
  selectedByDefault: PropTypes.bool,
  removeSeatCallback: PropTypes.func,
  maxReservableSeats: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isReserved: PropTypes.bool,
    tooltip: PropTypes.string,
    isSelected: PropTypes.bool
  }))).isRequired,
  tooltipProps: PropTypes.object,
  loading: PropTypes.bool
};

module.exports = SeatPicker;
//# sourceMappingURL=index.js.map
