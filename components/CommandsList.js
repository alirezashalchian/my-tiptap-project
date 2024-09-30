import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListSubheader from "@mui/joy/ListSubheader";
import Sheet from "@mui/joy/Sheet";

const CommandsList = forwardRef(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const scrollToItem = useCallback((index) => {
    const itemElement = itemRefs.current[index];
    const listElement = listRef.current;
    if (itemElement && listElement) {
      const itemRect = itemElement.getBoundingClientRect();
      const listRect = listElement.getBoundingClientRect();

      if (itemRect.bottom > listRect.bottom) {
        listElement.scrollTop += itemRect.bottom - listRect.bottom;
      } else if (itemRect.top < listRect.top) {
        listElement.scrollTop -= listRect.top - itemRect.top;
      }
    }
  }, []);

  const upHandler = useCallback(() => {
    setSelectedIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + items.length) % items.length;
      scrollToItem(newIndex);
      return newIndex;
    });
  }, [items.length, scrollToItem]);

  const downHandler = useCallback(() => {
    setSelectedIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % items.length;
      scrollToItem(newIndex);
      return newIndex;
    });
  }, [items.length, scrollToItem]);

  const enterHandler = useCallback(() => {
    const item = items[selectedIndex];
    if (item) {
      command(item);
    }
  }, [items, selectedIndex, command]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }
      if (event.key === "Enter") {
        enterHandler();
        return true;
      }
      return false;
    },
  }));

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
      ref={listRef}
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
                      ref={(el) => (itemRefs.current[globalIndex] = el)}
                      selected={globalIndex === selectedIndex}
                      onClick={() => command(item)}
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
});

CommandsList.displayName = "CommandsList";

export default CommandsList;
