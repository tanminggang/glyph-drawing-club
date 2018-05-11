import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore';
import Cell from './Cell';
import SelectionHighlight from './SelectionHighlight'


@observer class Grid extends Component {



  render() {
    const canvas = store.canvas
    const selected_y = store.selected_y;
    const selected_x = store.selected_x;

    const grid = canvas.map((row, y) =>
      <div className="row" key={y}>
        <div className={'rowNum ' + (selected_y === y ? 'highlighted' : '')}>{y + 1}</div>
        {row.map(([glyphPath, svgWidth, svgHeight, svgBaseline, glyphOffsetX, glyphFontSizeModifier, rotationAmount, flipGlyph, glyphInvertedColor], x) =>
          <Cell 
            glyphPath={glyphPath} 
            key={x} 
            defaultFontSize={store.defaultFontSize} 
            glyphFontSizeModifier={glyphFontSizeModifier} 
            svgWidth={svgWidth} 
            svgHeight={svgHeight} 
            svgBaseline={svgBaseline} 
            glyphOffsetX={glyphOffsetX} 
            cellWidth={store.cellWidth} 
            cellHeight={store.cellHeight}
            rotationAmount={rotationAmount}
            flipGlyph={flipGlyph}
            glyphInvertedColor={glyphInvertedColor}
            highlighted={y === selected_y && x === selected_x} />
        )}
      </div>
    );

    const colNums = [];
    for (var i=0; i<store.canvasWidth; i++) {
        colNums.push(
          <div key={i} className={'colNum ' + (selected_x === i ? 'highlighted' : '')} style={{width : store.cellWidth}}>{i + 1}</div>
        )
    }

    return (
      <div id="canvas" className="grid">
        <div className="colNums">{colNums}</div>
        {grid}
      </div>
    );
  }
}
export default Grid;