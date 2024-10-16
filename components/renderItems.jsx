import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import CommandsList from "./CommandsList";

const renderItems = () => {
  let reactRenderer;
  let popup;

  return {
    onStart: (props) => {
      reactRenderer = new ReactRenderer(CommandsList, {
        props,
        editor: props.editor,
      });

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: reactRenderer.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate(props) {
      reactRenderer.updateProps(props);

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown(props) {
      if (props.event.key === "Escape") {
        popup[0].hide();
        return true;
      }

      return reactRenderer.ref?.onKeyDown(props);
    },
    onExit() {
      popup[0].destroy();
      reactRenderer.destroy();
    },
  };
};

export default renderItems;
