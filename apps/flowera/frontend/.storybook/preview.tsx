// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "./storybook.css";
import "@mantine/core/styles.css";

import { useEffect } from "react";
import { addons } from "storybook/manager-api";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
// theme.ts file from previous step
import { theme } from "../src/theme";

import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DnDProvider } from "../src/react-flow/DnDContext";

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
  (renderStory) => (
    <MantineProvider theme={theme}>
      <ReactFlowProvider>
        <DnDProvider>{renderStory()}</DnDProvider>
      </ReactFlowProvider>
    </MantineProvider>
  ),
];
