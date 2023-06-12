export default function downloadAudio(
  buffer: AudioBuffer,
  filename: string = "audio.wav"
) {
  // Create an offline audio context
  const offlineContext = new OfflineAudioContext({
    numberOfChannels: buffer.numberOfChannels,
    length: buffer.length,
    sampleRate: buffer.sampleRate,
  });

  // Create an audio source from the buffer
  const source = offlineContext.createBufferSource();
  source.buffer = buffer;

  // Connect the source to the destination
  source.connect(offlineContext.destination);

  // Start rendering the audio
  offlineContext.startRendering().then((renderedBuffer) => {
    // Create a Blob with the rendered audio data
    const audioData = renderedBuffer.getChannelData(0); // Assuming mono audio
    const audioBlob = new Blob([audioData], { type: "audio/wav" });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(audioBlob);
    downloadLink.download = filename;

    // Programmatically click the link to start the download
    downloadLink.click();
  });
}
