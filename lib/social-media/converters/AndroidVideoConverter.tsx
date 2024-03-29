/* eslint-disable class-methods-use-this */
import { TemporaryDirectoryPath, copyFile } from 'react-native-fs';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

interface ConverterEngine {
  convert(arg0: string): Promise<string>;
}

class AndroidVideoConverter implements ConverterEngine {
  async convert(videoUri: string, index = 0, width = 720): Promise<string> {
    let fileUri = videoUri;

    if (videoUri.startsWith('content://')) {
      try {
        fileUri = await this.createFileUriFromContentUri(videoUri);
      } catch (e) {
        throw new Error('Failed to create file uri from content uri');
      }
    }

    const outputVideoName = `output${index}.mp4`;
    const outputVideoUri = `file://${TemporaryDirectoryPath}/${outputVideoName}`;

    console.log('====================================');
    console.log('COnvert Video', videoUri);
    console.log('====================================');

    try {
      const session = await FFmpegKit.execute(
        `-y -i ${fileUri} -vcodec mpeg4 -vf scale=-2:${width} -b:v 1.5M -format mp4 ${outputVideoUri}`
      );

      const returnCode = await session.getReturnCode();

      if (`${returnCode.toString()}` !== '0') {
        return '';
      }

      return outputVideoUri;
    } catch (e) {
      throw new Error('Failed to convert the video');
    }
  }

  async createFileUriFromContentUri(contentUri: string): Promise<string> {
    const fileUri = contentUri.replace(
      'com.android.providers.media.documents/document/video%3A',
      'media/external/video/media/'
    );
    const uriComponents = fileUri.split('/');
    const fileName = uriComponents[uriComponents.length - 1];
    const newFilePath = `${TemporaryDirectoryPath}/${fileName}`;
    await copyFile(contentUri, newFilePath);

    return `file://${newFilePath}`;
  }
}

export default AndroidVideoConverter;
