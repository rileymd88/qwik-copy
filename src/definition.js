var hideElement = {
  ref: "prop.hideElement",
  label: "Hide Element:",
  component: 'switch',
  type: "boolean",
  options: [{
      value: false,
      label: "No"
  }, {
      value: true,
      label: "Yes"
  }
  ],
  default: false
}

var settings = {
  component: "expandable-items",
  label: "Settings",
  items: {
      hideElement: hideElement
  }
};

export default {
  
  
  type: "items",
  component: "accordion",
  items: {
    settings: settings
  }
}