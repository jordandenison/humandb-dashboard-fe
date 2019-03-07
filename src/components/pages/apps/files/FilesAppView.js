import React, { Component } from 'react'

import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';
import { url } from 'lib/feathers/feathersClient'

const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `${url}/files`
}

class FilesView extends Component {
  render () {
    return (
      <div className='filesComponent' style={{ height: '480px' }}>
        <FileManager>
          <FileNavigator
            id="filemanager-1"
            api={connectorNodeV1.api}
            apiOptions={apiOptions}
            capabilities={connectorNodeV1.capabilities}
            listViewLayout={connectorNodeV1.listViewLayout}
            viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
          />
        </FileManager>
      </div>
    )
  }
}

export default FilesView
