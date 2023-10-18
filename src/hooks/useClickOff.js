import {useEffect} from "react";

/**
 * A generic hook used for elements needing to know whether the user has clicked off of its element.
 *
 * The most common use for this is dropdowns (if you click off the dropdown, it should close).
 *
 * @param elementRef The element to track
 * @param onClickOff A handler the developer passes in to take action when the user clicked off
 * @param exceptions A list of React Ref elements to exclude (special cases where it actually is the same element)
 */
const useClickOff = (elementRef, onClickOff, exceptions) => {
    useEffect(() => {
        /**
         * An internal click handler evaluating whether a mousedown was inside or outside the elementRef
         * @param event The click event
         */
        const handleClickOutside = (event) => {
            // Check if the target is any of the exceptions, ignore if found
            if (exceptions.some(element => element.current.contains(event.target))) return;

            // Check if target from clicking was NOT the element the hook belongs to
            if (document.contains(event.target) && elementRef.current && !elementRef.current.contains(event.target)) {
                onClickOff();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        // Always dispose mousedown to avoid redundant events
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [elementRef, onClickOff, exceptions])
}

export default useClickOff;