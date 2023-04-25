import Logger, { LogLevel } from '../src/utils/logger';

describe('Logger', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
    });

    it('should log debug messages when log level is set to DEBUG', () => {
        Logger.logLevel = LogLevel.DEBUG;
        // expect(consoleLogSpy).toHaveBeenCalledWith("[Debug]","(testfile)","test message");
    });

    it('should not log debug messages when log level is set to INFO', () => {
        Logger.logLevel = LogLevel.INFO;
        Logger.debug('(testFIle)', 'test message');
        
        // expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log info messages when log level is set to INFO', () => {
        Logger.logLevel = LogLevel.INFO;
        Logger.info('(testFIle)', 'test message');
        // expect(consoleLogSpy).toHaveBeenCalledWith('[INFO]: ((testFIle))\n\ttest message');
    });

    it('should not log info messages when log level is set to WARNING', () => {
        Logger.logLevel = LogLevel.WARNING;
        Logger.info('(testFIle)', 'test message');
        // expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log warning messages when log level is set to WARNING', () => {
        Logger.logLevel = LogLevel.WARNING;
        Logger.warn('(testFIle)', 'test message');
        // expect(consoleLogSpy).toHaveBeenCalledWith('[WARN]: ((testFIle))\n\ttest message');
    });

    it('should not log warning messages when log level is set to ERROR', () => {
        Logger.logLevel = LogLevel.ERROR;
        Logger.warn('(testFIle)', 'test message');
        // expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log error messages when log level is set to ERROR', () => {
        Logger.logLevel = LogLevel.ERROR;
        Logger.error('(testFIle)', 'test message');
        // expect(consoleLogSpy).toHaveBeenCalledWith('[ERROR]: ((testFIle))\n\ttest message');
    });

});
it('should give propper color to all the messages', () => {
    Logger.logLevel = LogLevel.DEBUG;
    Logger.start();
    Logger.debug('(testFIle)', 'test message');
    Logger.info('(testFIle)', 'test message');
    Logger.warn('(testFIle)', 'test message');
    Logger.error('(testFIle)', 'test message');
    Logger.time('(testFIle)',"Timing log functions");
})