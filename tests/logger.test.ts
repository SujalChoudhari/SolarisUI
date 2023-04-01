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
        Logger.debug('testFile', 'test message');
        expect(consoleLogSpy).toHaveBeenCalledWith('[DEBUG]: (testFile)\n\ttest message');
    });

    it('should not log debug messages when log level is set to INFO', () => {
        Logger.logLevel = LogLevel.INFO;
        Logger.debug('testFile', 'test message');
        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log info messages when log level is set to INFO', () => {
        Logger.logLevel = LogLevel.INFO;
        Logger.info('testFile', 'test message');
        expect(consoleLogSpy).toHaveBeenCalledWith('[INFO]: (testFile)\n\ttest message');
    });

    it('should not log info messages when log level is set to WARNING', () => {
        Logger.logLevel = LogLevel.WARNING;
        Logger.info('testFile', 'test message');
        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log warning messages when log level is set to WARNING', () => {
        Logger.logLevel = LogLevel.WARNING;
        Logger.warn('testFile', 'test message');
        expect(consoleLogSpy).toHaveBeenCalledWith('[WARN]: (testFile)\n\ttest message');
    });

    it('should not log warning messages when log level is set to ERROR', () => {
        Logger.logLevel = LogLevel.ERROR;
        Logger.warn('testFile', 'test message');
        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log error messages when log level is set to ERROR', () => {
        Logger.logLevel = LogLevel.ERROR;
        Logger.error('testFile', 'test message');
        expect(consoleLogSpy).toHaveBeenCalledWith('[ERROR]: (testFile)\n\ttest message');
    });
});