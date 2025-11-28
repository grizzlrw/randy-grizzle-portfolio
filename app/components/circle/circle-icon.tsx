// components/CircleIcon.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import { VectorRenderer } from "../vector-renderer/vector-renderer";
import type { GlyphComponent } from "../../types/glyph";

type stringPercent = `${number}%`;

type CircleIconProps = {
  /**
   * If provided, this sets a fixed pixel size for the circle.
   * If omitted, the circle will stretch to fill the parent container's width.
   */
  size?: number | stringPercent;
  /** Background color for the circle (MUI palette value or CSS color) */
  color?: string;
  glyph: GlyphComponent;
  title: string;
  description?: string;
  /**
   * Scale of the glyph relative to the circle.
   * 1 = roughly fills the circle, >1 = larger than the circle, <1 = smaller.
   */
  glyphScale?: number;
  /** percentage shifts relative to the circle size (positive = right / down) */
  glyphOffsetXPercent?: number;
  glyphOffsetYPercent?: number;
};

export function CircleIcon({
  size,                          // optional: fixed px; otherwise responsive
  color = "primary.50",
  glyph,
  title,
  description,
  glyphScale = 1.2,              // art a bit larger than the circle by default
  glyphOffsetXPercent = 0,
  glyphOffsetYPercent = 0,
}: CircleIconProps) {
  const transform = `
    translate(${glyphOffsetXPercent}%, ${glyphOffsetYPercent}%)
    scale(${glyphScale})
  `;

  return (
    <Box sx={{ 
      width: "100%", 
      height: "100%",
      }}>
      <Box
        sx={{
          width: size ?? "100%",
          marginLeft: "auto",
          marginRight: "auto",     // ← responsive: fill the container by default
          height: "auto",
          aspectRatio: "1 / 1",      // keep it square
          position: "relative",
          flexShrink: 0,
          transition: "transform 0.2s",
        }}
      >
        {/* Circle background (halo) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            bgcolor: color,
          }}
        />

        {/* Glyph on top, fully visible, scales with the circle */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              width: "100%",
              transform,
              transformOrigin: "center center",
            }}
          >
            <VectorRenderer glyph={glyph} title={title} description={description} />
          </Box>
        </Box>
        
      </Box>
      {/* <Typography component={"h3"} variant={"h4"} sx={{ textAlign: 'center' }}>Accessibility</Typography> */}
    </Box>
    
  );
}
