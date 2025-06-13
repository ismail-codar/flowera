// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { useEffect } from "react";
import { addons } from "storybook/manager-api";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
// theme.ts file from previous step
import { theme } from "../src/theme";

const channel = addons.getChannel();

const ColorSchemeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) => setColorScheme(value ? "dark" : "light");

  useEffect(() => {
    channel.on("DARK_MODE", handleColorScheme);
    return () => channel.off("DARK_MODE", handleColorScheme);
  }, [channel]);

  return <>{children}</>;
};

export const decorators = [
  (renderStory) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory) => <MantineProvider theme={theme}>{renderStory()}</MantineProvider>,
];
