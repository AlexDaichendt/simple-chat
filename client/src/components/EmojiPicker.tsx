import { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import EmojiPickerComponent from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";

interface EmojiPickerProps {
  onEmojiClick: (emoji: string) => void;
}

function EmojiPicker({ onEmojiClick }: EmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController(); // cool usage of AbortController to handle listener cleanup

    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiClick(emojiData.emoji);
    setShowPicker(false);
  };

  const handleToggleEmojiPicker = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // required to prevent default behavior of button click, which would trigger a form submit
    event.preventDefault();
    setShowPicker(!showPicker);
  };

  return (
    <div ref={pickerRef} className="relative">
      <button
        role="button"
        onClick={handleToggleEmojiPicker}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Open emoji picker"
      >
        😊
      </button>
      {showPicker && (
        <div className="absolute bottom-12 right-0 z-50">
          <EmojiPickerComponent
            lazyLoadEmojis
            emojiStyle={EmojiStyle.NATIVE} // uses native emoji style of the operating system, otherwise the displayed emoji will differ from what is shown in the picker
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPicker;
