import React, { Component } from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Sheet from "@mui/joy/Sheet";

class CommandList extends Component {
  state = {
    selectedIndex: 0,
  };

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown({ event }) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;
    return (
      <Sheet
        variant="outlined"
        sx={{
          width: 320,
          maxHeight: 300,
          overflow: "auto",
          borderRadius: "sm",
        }}
      >
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                selected={index === this.state.selectedIndex}
                onClick={() => this.selectItem(index)}
              >
                {item.element || item.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Sheet>
    );
  }
}

export default CommandList;
