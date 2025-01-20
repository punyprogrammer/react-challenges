function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalScroll = getComputedStyle(document.body).overflow;
    document.body.overflow.scroll = "hidden";
    return () => {
      document.body.overflow.scroll = originalScroll;
    };
  }, []);
}
