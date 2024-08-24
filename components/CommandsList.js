import React, { Component, createRef } from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListSubheader from "@mui/joy/ListSubheader";
import Sheet from "@mui/joy/Sheet";

class CommandsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.listRef = createRef();
    this.itemRefs = {};
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({ selectedIndex: 0 });
    }
  }

  onKeyDown = ({ event }) => {
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
  };

  upHandler = () => {
    this.setState(
      (prevState) => ({
        selectedIndex:
          (prevState.selectedIndex - 1 + this.props.items.length) %
          this.props.items.length,
      }),
      () => this.scrollToItem(this.state.selectedIndex)
    );
  };

  downHandler = () => {
    this.setState(
      (prevState) => ({
        selectedIndex: (prevState.selectedIndex + 1) % this.props.items.length,
      }),
      () => this.scrollToItem(this.state.selectedIndex)
    );
  };

  enterHandler = () => {
    this.selectItem(this.state.selectedIndex);
  };

  selectItem = (index) => {
    const item = this.props.items[index];
    if (item) {
      this.props.command(item);
    }
  };

  scrollToItem = (index) => {
    const itemElement = this.itemRefs[index];
    const listElement = this.listRef.current;
    if (itemElement && listElement) {
      const itemRect = itemElement.getBoundingClientRect();
      const listRect = listElement.getBoundingClientRect();

      if (itemRect.bottom > listRect.bottom) {
        listElement.scrollTop += itemRect.bottom - listRect.bottom;
      } else if (itemRect.top < listRect.top) {
        listElement.scrollTop -= listRect.top - itemRect.top;
      }
    }
  };

  render() {
    const { items } = this.props;
    const groupedItems = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    return (
      <Sheet
        variant="outlined"
        sx={{
          width: 320,
          maxHeight: 300,
          overflow: "auto",
          borderRadius: "sm",
        }}
        ref={this.listRef}
      >
        <List>
          {Object.entries(groupedItems).map(
            ([category, categoryItems], categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <ListSubheader>{category}</ListSubheader>
                {categoryItems.map((item, index) => {
                  const globalIndex = items.findIndex((i) => i === item);
                  return (
                    <ListItem key={index}>
                      <ListItemButton
                        ref={(el) => (this.itemRefs[globalIndex] = el)}
                        selected={globalIndex === this.state.selectedIndex}
                        onClick={() => this.selectItem(globalIndex)}
                      >
                        {item.element || item.title}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </React.Fragment>
            )
          )}
        </List>
      </Sheet>
    );
  }
}

export default CommandsList;
