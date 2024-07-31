# utils.py
import logging
import os

def setup_loggers():
    # 确保日志文件目录存在
    os.makedirs('./output', exist_ok=True)

    # 配置debug logger
    debug_logger = logging.getLogger('debug_logger')
    debug_logger.setLevel(logging.DEBUG)
    debug_handler = logging.FileHandler('./output/debugger.log', encoding='utf-8')
    debug_handler.setLevel(logging.DEBUG)
    debug_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    debug_handler.setFormatter(debug_formatter)
    debug_logger.addHandler(debug_handler)

    # 配置critical logger
    critical_logger = logging.getLogger('critical_logger')
    critical_logger.setLevel(logging.CRITICAL)
    critical_handler = logging.FileHandler('./output/output.log', encoding='utf-8', mode='w')
    critical_handler.setLevel(logging.CRITICAL)
    critical_formatter = logging.Formatter('%(message)s')
    critical_handler.setFormatter(critical_formatter)
    critical_logger.addHandler(critical_handler)

    # 避免日志重复打印到控制台
    # 如果需要也可以取消下面两行的注释
    # debug_logger.propagate = False
    # critical_logger.propagate = False

    return debug_logger, critical_logger